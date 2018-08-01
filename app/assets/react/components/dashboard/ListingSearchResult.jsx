import React from 'react'
import ListingPhoto from './listing/Photo.jsx'
import ListingInfo from './listing/Info.jsx'
import BasicInfo from './listing/BasicInfo.jsx'
import BedsBaths from './listing/BedsBaths.jsx'
import ListAsOpenButton from './listing/ListAsOpenButton.jsx'

const Listing = (props) => {
    return (
        <div>
            <ListAsOpenButton { ...props } />
            <div className={'column is-narrow home columns ' + (props.address ? '': 'loading')}>
                <ListingPhoto { ...props } />
                <ListingInfo { ...props } />
            </div>
        </div>

    );
};

export default Listing;
