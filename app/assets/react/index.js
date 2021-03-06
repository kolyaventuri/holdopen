import ReactDOM from 'react-dom';
import React from 'react';

import App from './components/App.jsx';
import Dashboard from './components/Dashboard.jsx';
import Marketplace from './components/Marketplace.jsx';
import Approval from './components/Approval.jsx';

if(window.location.pathname === '/') {
    ReactDOM.render(<App />, document.getElementById('container'));
} else if(window.location.pathname === '/dashboard') {
    ReactDOM.render(<Dashboard />, document.getElementById('container'));
} else if(window.location.pathname === '/marketplace') {
    ReactDOM.render(<Marketplace />, document.getElementById('container'));
} else if(window.location.pathname === '/dashboard/approvals') {
    ReactDOM.render(<Approval />, document.getElementById('container'));
}
