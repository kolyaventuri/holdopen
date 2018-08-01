import React from 'react'

const Beds = (props) => (
    <p className="beds">
    <i className="far fa-bed"></i>
    &nbsp;{ props.children }
    </p>
);

export default Beds;
