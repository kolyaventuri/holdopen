import React from 'react';
import {  withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

const Map = withScriptjs(withGoogleMap((props) =>
    <GoogleMap
      defaultZoom={12}
      defaultCenter={{ lat: 35.105, lng: -106.629 }}>
    </GoogleMap>
))

export default Map;
