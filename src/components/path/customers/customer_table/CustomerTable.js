import React from "react";
import PropTypes from 'prop-types';


import CustomerTableHeader from "./CustomerTableHeader";
import CustomerTableBody from "./CustomerTableBody";

// insert css here

import './CustomerTable.css';

const TABLE_HEADER = [
    "Select",
    "Name",
    "ID",
    "Email",
    "Number",
    "Point"
];

const CustomerTable = ({ custms, setSelectedRows, selectedRowsId, setSelectedRowsId }) => {
    return (
        <div className="customer-table__wrapper">
            <table className="customer-table" cellSpacing="0" >
                <thead>
                    <CustomerTableHeader tableHead={TABLE_HEADER} />
                </thead>
                <tbody>
                    <CustomerTableBody setSelectedRows={setSelectedRows} selectedRowsId={selectedRowsId} setSelectedRowsId={setSelectedRowsId} tableData={custms} />
                </tbody>
            </table>
        </div>
    );
};

CustomerTable.propTypes = {
    custms: PropTypes.array,
    setSelectedRows: PropTypes.func,
    selectedRowsId: PropTypes.array,
    setSelectedRowsId: PropTypes.func,
};

export default CustomerTable;