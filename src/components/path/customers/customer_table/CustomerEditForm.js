import React, { useState } from "react";
import axios from "axios";
import PropTypes from 'prop-types';

// import css here
import "./CustomerEditForm.css";

const CustomerEditForm = ({ custData, refereshCusts, setEditClicked }) => {
    const [customerName, setCustomerName] = useState(custData[0].custname);
    const [customerId, setCustomerId] = useState(custData[0].custid);
    const [customerEmail, setCustomerEmail] = useState(custData[0].custemail);
    const [customerNumber, setCustomerNumber] = useState(custData[0].custnum);

    const customerNameChangeHandler= (event) => {
        setCustomerName(event.target.value);
    };

    const customerEmailChangeHandler= (event) => {
        setCustomerEmail(event.target.value);
    };

    const customerNumberChangeHandler= (event) => {
        setCustomerNumber(event.target.value);
    };

    const customerEditFormSubmitHandler = async (event) => {
        event.preventDefault();

        const getData = {
            custName: customerName,
            custId: customerId,
            custEmail: customerEmail,
            custNumber: customerNumber,
        };

        await axios.post("/customers/edit_customer", getData).then(res => console.log(res)).catch(err => console.log(err));
        

        refereshCusts(true);
        setEditClicked(false);
    };

    const customerFormCancelHandler = (event) => {
        event.preventDefault();

        setEditClicked(false);
    };
    
    return (
        <div className="ct-editform__wrapper">
            <div className="ct-editform-body">
                <form className="customer-edit-form" onSubmit={customerEditFormSubmitHandler}>
                    <div className="cef-inputs">
                        <input type="text" value={customerName} onChange={customerNameChangeHandler} />
                        <input type="text" value={customerEmail} onChange={customerEmailChangeHandler} />
                        <input type="number" value={customerNumber} onChange={customerNumberChangeHandler} />
                    </div>
                    <div className="cef-buttons">
                        <button className="button">Submit</button>
                        <button className="button" onClick={customerFormCancelHandler}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

CustomerEditForm.propTypes = {
    custData: PropTypes.array,
    refereshCusts: PropTypes.func,
    setEditClicked: PropTypes.func,
};

export default CustomerEditForm;