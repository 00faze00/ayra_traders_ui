import React, { useState, useEffect } from "react";
import axios from "axios";

import GiftForm from "./GiftForm";
import GiftItem from "./GiftItem";

// importing img here
// import css here
import "./Gifts.css";


const Gifts = () => {
  const [isGiftFormOpen, setGiftFormOpen] = useState(false);
  const [gifts, setGifts] = useState([]);
  const [count, setCount] = useState(true);

  const formDisplayHandler = () => {
    setGiftFormOpen(true);
  };

  const fetchAllGift = () => {
      axios.get('/gifts').then(res => {
        setGifts(res.data)
      }).catch(err => console.log(err));
    };
    
    useEffect(() => {
      fetchAllGift();
      setCount(false);
  }, [count]);

  return (
    <div className="gifts-wrapper">
      <div className="gifts-wrapper_container">
        <div className="gifts-heading">
          <p>Gifts</p>
          <button className="add-gift" onClick={formDisplayHandler}>
            Add Gifts
          </button>
        </div>
        {isGiftFormOpen && (
          <GiftForm updateGifts={setCount}  isOpen={setGiftFormOpen} />
        )}
        <div className="gifts-items">
          {gifts.map((gift, index) => (
            <GiftItem
              key={index}
              giftImgName={gift.giftimgname}
              giftId={gift.giftid}
              giftName={gift.giftname}
              giftPrice={gift.giftprice}
              giftPoint={gift.giftpoint}
              updateGifts={setCount}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gifts;
