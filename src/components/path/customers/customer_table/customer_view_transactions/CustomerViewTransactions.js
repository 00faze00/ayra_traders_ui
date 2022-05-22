import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import axios from "axios";

import './CustomerViewTransaction.css';

const CustomerViewTransactions = ({ custData }) => {
    const [custName, setCustName] = useState(custData[0].custname);
    const [custId, setCustId] = useState(custData[0].custid);
    const [custTransactions, setCustomerTransactions] = useState([]);
    const fetchAllTransactionsById = () => {
        axios.get('/purchases/' + custId).then(res => setCustomerTransactions(res.data)).catch(err => console.log(err));
    };

    useEffect(() => {
        fetchAllTransactionsById();
    }, []);

    return (
        <div className="custtransactions-wrapper">
            <div className="custtransactions">
                <label>All Transactions of {custName}</label>
                <div className="custtransactions-main">
                    {
                        custTransactions.map((transaction, index) => (
                            <div key={index} className="custtransaction">
                                {transaction.custid}
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );

};

CustomerViewTransactions.propTypes  = {
    custData : PropTypes.array,
    setViewTransactionClicked : PropTypes.func
};

export default CustomerViewTransactions;