import React from 'react';

export default class Price extends React.Component {
    constructor(props) {
        super(props);

        this.formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0
        });
    }

    render() {
        return (
            <p className="price">{ this.formatter.format(this.props.children) }</p>
        )
    }
}

