import React, { useState } from "react";
import { PropTypes } from "prop-types";
import axios from "axios";

// import css here

import "./CustomerForm.css";

const CustomerForm = ({ isVisible, visibilityChangeHandler, refereshCusts }) => {
  const [cusName, setCusName] = useState("");
  const [cusEmail, setCusEmail] = useState("");
  const [cusNumber, setCusNumber] = useState("");
  const [cusPoints, setCusPoints] = useState("");

  const cusNameChangeHandler = (event) => {
    setCusName(event.target.value);
  };

  const cusEmailChangeHandler = (event) => {
    setCusEmail(event.target.value);
  };

  const cusNumberChangeHandler = (event) => {
    setCusNumber(event.target.value);
  };

  const cusPointsChangeHandler = (event) => {
    setCusPoints(event.target.value);
  };

  const clearAllHandlers = () => {
    setCusName("");
    setCusEmail("");
    setCusNumber("");
    setCusPoints("");
  };

  const cusSubmitHandler = (event) => {
    event.preventDefault();

    if ( cusName && cusEmail && cusNumber && cusEmail ) {
      const customerData = {
        "custName": cusName,
        "custEmail": cusEmail,
        "custNumber": cusNumber,
        "custPoints": cusPoints,
      };
  
      axios.post("/customers/add_customer", customerData).then(res => console.log(res)).catch(err => console.log(err));
  
      clearAllHandlers();
      refereshCusts(true);
      visibilityChangeHandler(false);
    }
  };

  const cusFormCancelHandler = (event) => {
    event.preventDefault();
    clearAllHandlers();
    visibilityChangeHandler(false);
  };

  return (
    <div className={"customers-form " + (isVisible ? 'isVisible' : '')} >
      <div className="customers-form__body">
        <form className="cusform" onSubmit={cusSubmitHandler}>
          <div className="cusform-grp__input">
            <label>Customer Name</label>
            <input type="text" value={cusName} onChange={cusNameChangeHandler} />
          </div>
          <div className="cusform-grp__input">
            <label>Customer Email</label>
            <input type="text" value={cusEmail} onChange={cusEmailChangeHandler} />
          </div>
          <div className="cusform-grp__input">
            <label>Customer Number</label>
            <input type="number" value={cusNumber} onChange={cusNumberChangeHandler} />
          </div>
          <div className="cusform-grp__input">
            <label>Customer Points</label>
            <input type="number" value={cusPoints} onChange={cusPointsChangeHandler} />
          </div>
          <div className="cusform-grp-btn">
              <button type="submit" className="button cusform-submit" >Add Customer</button>
              <button className="button" onClick={cusFormCancelHandler}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

CustomerForm.propTypes = {
    isVisible: PropTypes.bool,
    visibilityChangeHandler: PropTypes.func,
    refereshCusts: PropTypes.func,
};

export default CustomerForm;
