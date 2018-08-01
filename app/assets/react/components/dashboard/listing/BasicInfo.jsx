import React from 'react'
import Price from './Price.jsx'
import SqFt from './SqFt.jsx'
import Address from './Address.jsx'

const BasicInfo = ({ address, price, sqft }) => {
    return (
        <div className='column is-narrow is-three-quarters columns'>
        <div className='column'>
            <div className='info'>
                <Address>{ address }</Address>
                <Price>{ price }</Price>
                <SqFt>{ sqft }</SqFt>
            </div>
        </div>
        </div>
    );
};

export default BasicInfo;
