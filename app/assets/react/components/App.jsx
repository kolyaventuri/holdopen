import React from 'react';
import Map from './Map.jsx';

class App extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Map
            googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyDN532AwH9GbcNurROKbFG01SjXnXNB3f0"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `400px`, width: `100%` }} />}
                mapElement={<div style={{ height: `100%` }} />}
            />
        )
    }
}

export default App;
