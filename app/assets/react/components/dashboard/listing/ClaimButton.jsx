import React from 'react';

export default class ClaimButton extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            done: false
        };
    }

    listAsOpen() {
        fetch('/api/v1/openhomes/bid', {
            credentials: 'same-origin',
            method: 'POST',
            body: JSON.stringify({
                id: this.props.claim_id
            }),
            headers:{
                'Content-Type': 'application/json'
            }
        }).then(response => {
            return response.json();
        }).then(data => {
            if(data.success) {
                this.setState({ done: true });
            } else {
                alert('Something went wrong.');
            }
        }).catch(err => {
            console.error(err)
        });
    }


    render() {
        return (
            <a className={ this.state.done ? 'button is-success is-outlined' : 'button' } onClick={this.listAsOpen.bind(this)}>{ this.state.done ? <i className="far fa-check"></i> : "I'll take it!"}</a>
        )
    }
}
