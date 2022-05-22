import React, { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";


import './CustomerTableBodyRow.css';

const CustomerTableBodyRow = ({ custId, custName, custEmail, custNumber, setSelectedRows, selectedRowsId, setSelectedRowsId }) => {
  const [isChecked, setIsChecked] = useState();
  // const [isCustInRows, setIsCustInRows] = useState(true);
  const [points, setPoints] = useState(0);
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

  const fetchPoints = async (custId) => {
    const res = await axios.get('/purchases/getPoinst/' + custId);
    const data = await res.data[0].totalPoints;
    setPoints(data);
  };

  useEffect(() =>{
    fetchPoints(custId);
  }, [custId]);
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
      <td className="ct-header__td">{points}</td>
    </tr>
  );
};

CustomerTableBodyRow.propTypes = {
    custId: PropTypes.number,
    custName: PropTypes.string,
    custEmail: PropTypes.string,
    custNumber: PropTypes.number,
    setSelectedRows: PropTypes.func,
    selectedRowsId: PropTypes.array,
    setSelectedRowsId: PropTypes.func,
};

export default CustomerTableBodyRow;
