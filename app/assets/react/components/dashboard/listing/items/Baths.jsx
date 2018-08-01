import React from 'react'

const Baths = (props) => (
    <p className="baths">
    <i className="far fa-bath"></i>
    &nbsp;{ props.children }
    </p>
);

export default Baths;
