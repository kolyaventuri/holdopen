import React from 'react';

import SearchForm from './dashboard/SearchForm.jsx';
import Listing from './dashboard/ListingSearchResult.jsx'

const SEARCH_ENDPOINT = '/api/v1/search';

class Dashboard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            listings: []
        };
    }

    doSearch(event) {
        fetch(`${SEARCH_ENDPOINT}?q=${encodeURIComponent(event.target.value)}`, {credentials: 'same-origin'}).then(response => {
            return response.json();
        }).then(results => {
            results = results.results;
            if(!results) return;

            let listings = results.map(home => {
                return {
                    id: home.MLSId,
                    hero_small: home.Photos[0] ? home.Photos[0].UriThumb : null,
                    hero: home.Photos[0] ? home.Photos[0].Uri2048 : null,
                    address: home.FirstLineAddress,
                    price: home.ListPrice,
                    baths: home.TotalBaths,
                    beds: home.TotalBeds,
                    garage: home.GarageSpaces,
                    sqft: home.Sqft,
                    lot_size: home.LotSizeAcres
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
                        <SearchForm handleKeyPress={ this.doSearch.bind(this) }/>
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

export default Dashboard;
