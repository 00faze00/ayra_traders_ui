import React, { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from 'prop-types';

import './CustomerAddPoints.css';

const CustomerAddPoints = ({ custData, setAddPointsClicked }) => {
    const [purchases, setPurchases] = useState([]);
    const [custId, setCustId] = useState(custData[0].custid);
    // console.log(custData[0]);

    const [productName, setProductName] = useState('');
    const [productId, setProductId] = useState('');
    const [quantity, setQuantity] = useState('');
    const [points, setPoints] = useState('');

    const productNameChangeHandler = (event) => {
        setProductName(event.target.value);
    };
    const productIdChangeHandler = (event) => {
        setProductId(event.target.valueAsNumber);
    };
    const quantityChangeHandler = (event) => {
        setQuantity(event.target.valueAsNumber);
    };
    const pointsChangeHandler = (event) => {
        setPoints(event.target.valueAsNumber);
    };

    const purchansesCancelHandler = (event) => {
        event.preventDefault();
        setAddPointsClicked(curr => !curr);
    };

    const addPurchaseHandler = (event) => {
        event.preventDefault();
        const tempPurchase = {
            "custId" : custId,
            "productName" : productName,
            "productId" : productId,
            "quantity" : quantity,
            "points" : points,
        };

        setPurchases(curr => [...curr, tempPurchase]);

        setProductName('');
        setProductId('');
        setQuantity('');
        setPoints('');
    };

    const removePurchaseHandler = (event) => {
        event.preventDefault();
        const tempInd = event.target.id;
        setPurchases(curr => {
            return curr.filter((item, index) => index != tempInd );
        });
    };

    const submitPurchasesHandler = (event) => {
        event.preventDefault();
        console.log(purchases);
        let sumPoints = 0;
        purchases.forEach(item => sumPoints += item.points);
        console.log(sumPoints);
        purchases.forEach(item => {
            axios.post('/add_purchases', item).then(res => console.log(res)).catch(err => console.log(err));
        });
        setAddPointsClicked(curr => !curr);
    };

    return (
        <div className="customeraddpoints-wrapper ">
            <div className="customeraddpoints">
                <form className="customeraddpoints-form" onSubmit={submitPurchasesHandler}>
                    <div className="cancel-form" onClick={purchansesCancelHandler}>
                        &#10006;
                    </div>
                    <div className="customeraddtransactions-wrapper">
                        <div className="custaddtrans">
                            <div className="custaddtran__inputs">
                                <div className="custaddtran__input">
                                    <input type="text" placeholder="Product Name" value={productName} onChange={productNameChangeHandler}/>
                                </div>
                                <div className="custaddtran__input">
                                    <input type="number" placeholder="Product Id" value={productId} onChange={productIdChangeHandler} />
                                </div>
                                <div className="custaddtran__input">
                                    <input type="number" placeholder="Quantity" value={quantity} onChange={quantityChangeHandler} />
                                </div>
                                <div className="custaddtran__input">
                                    <input type="number" placeholder="Points" value={points} onChange={pointsChangeHandler} />
                                </div>
                                <div className="custaddtran__btn">
                                    <button className="button" onClick={addPurchaseHandler}>Add</button>
                                </div>
                            </div>
                        </div>
                        <div className="custaddedtrans-wrapper">
                            <div className="custaddedtrans">
                                    {
                                        (purchases.length < 1) && (
                                            <div>
                                                <h3>Add Items</h3>
                                            </div>
                                        )
                                    }
                                    {
                                        purchases.map((purchase, index) => (
                                            <div className="custaddedtran" key={index}>
                                                <ul className="custaddedtran__details">
                                                    <li>{purchase.productname}</li>
                                                    <li>{purchase.productid}</li>
                                                    <li>{purchase.quantity}</li>
                                                    <li>{purchase.points}</li>
                                                </ul>
                                                <div className="custaddedtran__del">
                                                    <button id={index} className="button" onClick={removePurchaseHandler}>&#10006;</button>
                                                </div>
                                            </div>
                                        ))
                                    }
                            </div>
                        </div>
                        <div className="custaddedtrans-submit">
                            <button type="submit" className="button">Submit Points</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

CustomerAddPoints.propTypes = {
    custData : PropTypes.array,
    setAddPointsClicked: PropTypes.func,
};

export default CustomerAddPoints;