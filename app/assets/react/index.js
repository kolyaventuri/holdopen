import ReactDOM from 'react-dom';
import React from 'react';

import App from './components/App.jsx';
import Dashboard from './components/Dashboard.jsx';

if(window.location.pathname === '/') {
    ReactDOM.render(<App />, document.getElementById('container'));
} else if(window.location.pathname === '/dashboard') {
    ReactDOM.render(<Dashboard />, document.getElementById('container'));
}
