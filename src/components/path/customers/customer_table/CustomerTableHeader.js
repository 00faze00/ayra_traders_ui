import React from "react";
import PropTypes from 'prop-types';

import './CustomerTableHeader.css';

const CustomerTableHeader = ({ tableHead }) => {
    return(
        <tr className="ct-header__tr">
            {
                tableHead.map((th, index) => (
                    <th className="ct-header__th" key={index}>{th}</th>
                ))
            }
        </tr>
    );
};

CustomerTableHeader.propTypes = {
    tableHead: PropTypes.array,
};

export default CustomerTableHeader;