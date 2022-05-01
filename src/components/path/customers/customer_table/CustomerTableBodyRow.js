import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";


import './CustomerTableBodyRow.css';

const CustomerTableBodyRow = ({ custId, custName, custEmail, custNumber, custPoints, setSelectedRows, selectedRowsId, setSelectedRowsId }) => {
  const [isChecked, setIsChecked] = useState(false);
  const checkboxChangeHandler = (event) => {
    const tempBool = selectedRowsId.includes(custId);
    console.log(tempBool, isChecked);
    setIsChecked(curr => {
      if (!tempBool) {
        return curr = true;
      } else {
        return curr = false;
      }
    });
    if (isChecked === false) {
      setSelectedRows((revState) => {
        return ++revState;
      });
      setSelectedRowsId(curr => [...curr, custId]);
    } else {
      setSelectedRows((revState) => {
        return --revState;
      });
      setSelectedRowsId(curr => {
        return curr.filter(item => item !== custId);
      });
    }
  };
  return (
    <tr key={custId} className={ "ct-body__tr " +  (isChecked ? "checked" : "")}>
      <td className="ct-header__td"><input type="checkbox" onChange={checkboxChangeHandler} /></td>
      <td className="ct-header__td">{custName}</td>
      <td className="ct-header__td">{custId}</td>
      <td className="ct-header__td">{custEmail}</td>
      <td className="ct-header__td">{custNumber}</td>
      <td className="ct-header__td">{custPoints}</td>
    </tr>
  );
};

CustomerTableBodyRow.propTypes = {
    custId: PropTypes.number,
    custName: PropTypes.string,
    custEmail: PropTypes.string,
    custNumber: PropTypes.number,
    custPoints: PropTypes.number,
    setSelectedRows: PropTypes.func,
    selectedRowsId: PropTypes.array,
    setSelectedRowsId: PropTypes.func,
};

export default CustomerTableBodyRow;
