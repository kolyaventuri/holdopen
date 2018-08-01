import React from 'react'
import ListingPhoto from './listing/Photo.jsx'
import ListingInfo from './listing/Info.jsx'
import BasicInfo from './listing/BasicInfo.jsx'
import BedsBaths from './listing/BedsBaths.jsx'

const Listing = (props) => {
    return (
        <div className={'column is-narrow home columns ' + (props.address ? '': 'loading')}>
        <ListingPhoto { ...props } />
        <ListingInfo { ...props } />
        </div>
    );
};

export default Listing;
