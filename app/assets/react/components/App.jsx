import React from 'react';
import Map from './Map.jsx';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            markers: []
        }
    }
    render() {
        return (
            <Map />
        )
    }
}

export default App;
