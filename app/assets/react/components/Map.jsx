import React from 'react';
import { compose, withProps } from 'recompose';
import {  withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

const MyMap = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyDN532AwH9GbcNurROKbFG01SjXnXNB3f0",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `400px`, width: `100%` }} />,
        mapElement: <div style={{ height: `100%` }} />,
    }),
    withScriptjs,
    withGoogleMap
)((props) =>
    <GoogleMap
    defaultZoom={12}
    defaultCenter={{ lat: 35.105, lng: -106.629 }}>
    >
    {
        props.markers.map(marker => {
            let key = Math.random().toString(36);
            return <Marker position={marker} key={key} />
        })
    }
    </GoogleMap>
);

class Map extends React.PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            markers: []
        };
    }

    componentDidMount() {
        fetch('/api/v1/openhomes').then(response => {
            return response.json();
        }).then(data => {
            let markers = data.results.map(result => {
                return {
                    lat: result.listing.Latitude,
                    lng: result.listing.Longitude
                };
            });

            console.log(markers);

            this.setState({ markers });
        }).catch(err => {
            console.error(err);
        });
    }

    render() {
        return (
            <MyMap
            markers={this.state.markers}
            />
        )
    }
}

export default Map;
