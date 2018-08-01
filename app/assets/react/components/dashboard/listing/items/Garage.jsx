import React from 'react'

const Garage = (props) => (
    <p className="garage">
    <i className="far fa-car"></i>
    &nbsp;{ props.children }
    </p>
);

export default Garage;
