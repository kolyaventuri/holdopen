import React from 'react'

export default class Photo extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            hero: props.hero_small
        };
    }

    componentDidMount() {
        let image = new Image();

        image.onload = () => {
            this.setState({ hero: this.props.hero });
        }

        image.src = this.props.hero;
    }

    render() {
        const listingStyle = {
            backgroundImage: 'url(' + this.state.hero + ')',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center'
        };

        return (
            <div className='column is-narrow is-one-quarter'>
            <div className='hero' style={this.props.hero ? listingStyle : {}}></div>
            </div>
        );
    }
}
