import React from "react";
import PropTypes from "prop-types";

import CustomerTableBodyRow from "./CustomerTableBodyRow";

const CustomerTableBody = ({ tableData, setSelectedRows, selectedRowsId, setSelectedRowsId }) => {
  return (
    <>
      {tableData.map((customer, index) => (
        <CustomerTableBodyRow
          key={index}
          custId={customer.custid}
          custName={customer.custname}
          custEmail={customer.custemail}
          custNumber={customer.custnum}
          custPoints={customer.custpoints}
          setSelectedRows={setSelectedRows}
          selectedRowsId={selectedRowsId}
          setSelectedRowsId={setSelectedRowsId}
        />
      ))}
    </>
  );
};

CustomerTableBody.propTypes = {
  tableData: PropTypes.array,
  setSelectedRows: PropTypes.func,
  selectedRowsId: PropTypes.array,
  setSelectedRowsId: PropTypes.func,
};

export default CustomerTableBody;
