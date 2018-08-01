import React from 'react'
import ListingPhoto from './listing/Photo.jsx'
import ListingInfo from './listing/Info.jsx'
import BasicInfo from './listing/BasicInfo.jsx'
import BedsBaths from './listing/BedsBaths.jsx'
import ListAsOpenButton from './listing/ListAsOpenButton.jsx'
import ClaimButton from './listing/ClaimButton.jsx'
import ApproveButton from './listing/ApproveButton.jsx'

const Listing = (props) => {
    let button;

    if(!props.marketplace && !props.approval) {
        button = <ListAsOpenButton { ...props } />
    } else if(props.marketplace) {
        button = <ClaimButton { ...props } />
    } else {
        button = <ApproveButton { ...props } />
    }
    return (
        <div>
            {button}
            <div className={'column is-narrow home columns ' + (props.address ? '': 'loading')}>
                <ListingPhoto { ...props } />
                <ListingInfo { ...props } />
            </div>
        </div>

    );
};

export default Listing;
