import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";


import './CustomerTableBodyRow.css';

const CustomerTableBodyRow = ({ custId, custName, custEmail, custNumber, custPoints, setSelectedRows, selectedRowsId, setSelectedRowsId }) => {
  const [isChecked, setIsChecked] = useState();
  // const [isCustInRows, setIsCustInRows] = useState(true);
  const checkboxChangeHandler = (event) => {

    let iscbChecked = event.target.checked;
    let tempBool = selectedRowsId.includes(custId);
    setIsChecked(iscbChecked);
    if (iscbChecked && !tempBool) {
      setSelectedRows(prevState => ++prevState);
      setSelectedRowsId(prevState => [...prevState, custId]);
    } else {
      setSelectedRows(prevState => --prevState);
      setSelectedRowsId(prevState => {
        return prevState.filter(item => item !== custId);
      });
    }
  };
  // useEffect(() => {
  //   let seeIs = selectedRowsId.includes(custId);
  //   setIsChecked(seeIs);
  //   setIsCustInRows(false);
  // }, [isCustInRows]);
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
