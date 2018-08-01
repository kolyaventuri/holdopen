import React from 'react';
import { Throttle } from 'react-throttle';

class SearchForm extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div className='field has-addons'>
                    <div className='control is-expanded search'>
                        <Throttle time='500' handler='onKeyPress'>
                            <input type='text' name='q' placeholder='Search for a home' className='input' onKeyPress={this.props.handleKeyPress} />
                        </Throttle>
                    </div>
                    <div className='control'>
                        <a className='button is-primary'>Search</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default SearchForm;
