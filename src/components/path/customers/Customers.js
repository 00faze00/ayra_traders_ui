import React, { useState, useEffect } from "react";
import axios from "axios";

import CustomerForm from "./CustomerForm";
import CustomerTable from "./customer_table/CustomerTable";
import CustomerTableBottomToolbar from "./customer_table/CustomerTableBottomToolbar";

// import css here

import "./Customers.css";

const Customers = () => {
  const [isCusFormVisible, setIsCusFormVisible] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [count, setCount] = useState(true);
  const [selectedRows, setSelectedRows] = useState(0);
  const [selectedRowsId, setSelectedRowsId] = useState([]);

  const addCustomerClickHandler = (event) => {
    event.preventDefault();
    setIsCusFormVisible(!isCusFormVisible);
  };

  const fetchAllCustomers = () => {
    axios.get('/customers').then(res => {
      setCustomers(res.data);
    }).catch(err => console.log(err));
  };

  useEffect(() => {
      fetchAllCustomers();
      setCount(false);
  }, [count]);

  return (
    <div className="customers-wrapper">
      <div className="customers-wrapper__container">
        <div className="customers-header">
          <h1>Customers</h1>
          <button className="button" onClick={addCustomerClickHandler}>
            Add Customer
          </button>
        </div>
        <CustomerForm
          isVisible={isCusFormVisible}
          visibilityChangeHandler={setIsCusFormVisible}
          refereshCusts={setCount}
        />
        <div className="customers-body">
          <CustomerTable setSelectedRows={setSelectedRows} selectedRowsId={selectedRowsId} setSelectedRowsId={setSelectedRowsId} custms={customers} />
        </div>
        <div className="customer-bottomtoolbar">
          <CustomerTableBottomToolbar selectedRowsId={selectedRowsId} setSelectedRowsId={setSelectedRowsId} rowSelected={selectedRows} setSelectedRows={setSelectedRows} refereshCusts={setCount} />
        </div>
      </div>
    </div>
  );
};

export default Customers;
