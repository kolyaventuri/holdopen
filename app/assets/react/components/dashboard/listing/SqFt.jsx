import React from 'react';

export default class SqFt extends React.Component {
    constructor(props) {
        super(props);

        this.formatter = new Intl.NumberFormat('en-US', {
            maximumFractionDigits: 0
        });
    }

    render() {
        return (
            <p className="sqft">{ this.formatter.format(this.props.children) } SqFt</p>
        )
    }
}

