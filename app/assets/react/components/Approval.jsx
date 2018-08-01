import React from 'react';

import Listing from './dashboard/ListingSearchResult.jsx'

const ENDPOINT = '/api/v1/openhomes/my/bidders';

class Approval extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            listings: []
        };
    }

    componentDidMount() {
        fetch(ENDPOINT, {credentials: 'same-origin'}).then(response => {
            return response.json();
        }).then(results => {
            results = results.results;
            if(!results) return;

            let listings = results.map(data => {
                let home = data.listing;
                console.log(data)
                return {
                    claim_id: data.bids[0]._id,
                    id: home.MLSId,
                    hero_small: home.Photos[0] ? home.Photos[0].UriThumb : null,
                    hero: home.Photos[0] ? home.Photos[0].Uri2048 : null,
                    address: home.FirstLineAddress,
                    price: home.ListPrice,
                    baths: home.TotalBaths,
                    beds: home.TotalBeds,
                    garage: home.GarageSpaces,
                    sqft: home.Sqft,
                    lot_size: home.LotSizeAcres,
                    approval: true
                }
            });
            this.setState((prevState) => {
                return { listings };
            });

        }).catch(err => {
            console.error(err);
        })
    }

    render() {
        return (
            <div className='container'>
                <div className='columns'>
                    <div className='column is-two-thirds'>
                        {
                            this.state.listings.map(listing => {
                                let key = Math.random().toString(36);
                                return (<Listing {...listing} key={key} />);
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default Approval;
