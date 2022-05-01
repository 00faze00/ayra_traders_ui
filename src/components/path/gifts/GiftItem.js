import React, { useState } from "react";

import axios from "axios";

import PropTypes from "prop-types";

//import css here

import "./GiftItem.css";

const GiftItem = ({
  giftImgName,
  giftId,
  giftName,
  giftPrice,
  giftPoint,
  updateGifts,
}) => {
  const [isGiftItemOpen, setGiftItemOpen] = useState(false);

  const [giGiftName, setgiGiftName] = useState(giftName);
  const [giGiftPrice, setgiGiftPrice] = useState(giftPrice);
  const [giGiftPoint, setgiGiftPoint] = useState(giftPoint);
  const [giselectedImage, setgiSelectedImage] = useState();
  const [giselectedImageName, setgiSelectedImageName] = useState(giftImgName);

  const giftnameChangeHandler = (event) => {
    setgiGiftName(event.target.value);
  };

  const giftpriceChangeHandler = (event) => {
    setgiGiftPrice(event.target.value);
  };

  const giftpointChangeHandler = (event) => {
    setgiGiftPoint(event.target.value);
  };

  const giftItemClickHandler = () => {
    setGiftItemOpen(true);
  };

  const imageChangeHandler = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      setgiSelectedImage(event.target.files[0]);
      setgiSelectedImageName(event.target.files[0].name);
    }
  };

  const editGiftHandler = async (event) => {
    event.preventDefault();

    if (
      giGiftName !== giftName ||
      giGiftPrice !== giftPrice ||
      giGiftPoint !== giftPoint ||
      giselectedImageName !== giftImgName
    ) {
      const giftData = {
        giftImgName: giselectedImageName,
        giftId: giftId,
        giftName: giGiftName,
        giftPrice: giGiftPrice,
        giftPoint: giGiftPoint,
      };

      let formData = new FormData();

      formData.append("giftImg", giselectedImage);

      await axios({
        method: "POST",
        url: "/gifts/giftimgupload",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));

      await axios.post("/gifts/edit_gift", giftData);

      giftName = giGiftName;
      giftPrice = giGiftPrice;
      giftPoint = giGiftPoint;

      updateGifts(true);
    }

    setGiftItemOpen(false);
  };

  const deleteGifthandler = async (event) => {
    event.preventDefault();
    await axios.post("/gifts/remove_gift", {
      giftId: giftId,
    });
    updateGifts(true);
    setGiftItemOpen(false);
  };

  const cancelFormHandler = (event) => {
    // event.preventDefault();
    setGiftItemOpen(false);
  };

  return (
    <div
      className={"gifts-item " + (isGiftItemOpen ? "gift-expand" : "")}
      onClick={giftItemClickHandler}
    >
      {!isGiftItemOpen && (
        <img src={"/assets/gifts/img/" + giftImgName} alt="Gifts Item" />
      )}
      {isGiftItemOpen && (
        <form onSubmit={editGiftHandler}>
          <label className="addgift-form__input-image">
            <input
              accept="image/*"
              type="file"
              hidden
              onChange={imageChangeHandler}
            />
            <img src={"/assets/gifts/img/" + giftImgName} alt="Gifts Item" />
          </label>
          <div className="gift-item__edit-form">
            <input
              type="text"
              value={giGiftName}
              onChange={giftnameChangeHandler}
            />
            <input
              type="number"
              value={giGiftPrice}
              onChange={giftpriceChangeHandler}
            />
            <input
              type="number"
              value={giGiftPoint}
              onChange={giftpointChangeHandler}
            />
          </div>
          <div className="gift-item__edit-form__buttons">
            <button type="submit">Confirm</button>
            <button onClick={cancelFormHandler}>Cancel</button>
            <button onClick={deleteGifthandler}>Delete</button>
          </div>
        </form>
      )}
      {!isGiftItemOpen && (
        <div className="gifs-item__tbody">
          <div className="gift-item_tbody-metric">
            <h3>{giftName}</h3>
            <p>{giftPoint}</p>
          </div>
          <p>${giftPrice}</p>
        </div>
      )}
    </div>
  );
};

GiftItem.propTypes = {
  giftImgName: PropTypes.string,
  giftId: PropTypes.number,
  giftName: PropTypes.string,
  giftPrice: PropTypes.number,
  giftPoint: PropTypes.number,
  updateGifts: PropTypes.func,
};

export default GiftItem;
