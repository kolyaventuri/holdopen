import React from 'react';

import SearchForm from './dashboard/SearchForm.jsx';

class Dashboard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            results: []
        };
    }

    doSearch(event) {
        console.log(event.target.value)
    }

    render() {
        return (
            <div className='container'>
                <div className='columns'>
                    <div className='column is-two-thirds'>
                        <SearchForm handleKeyPress={ this.doSearch }/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Dashboard;
