import React, { useState } from "react";
import { PropTypes } from "prop-types";
import axios from "axios";

// import css here
import "./GiftForm.css";

const GiftForm = ({ updateGifts, isOpen }) => {
  const [giftTitle, setGiftTitle] = useState("");
  const [giftPrice, setGiftPrice] = useState("");
  const [giftPoint, setGiftPoint] = useState("");
  const [selectedImage, setSelectedImage] = useState();
  const [selectedImageName, setSelectedImageName] = useState("");

  const titleChangeHander = (event) => {
    setGiftTitle(event.target.value);
  };

  const priceChangeHander = (event) => {
    setGiftPrice(event.target.value);
  };

  const pointChangeHander = (event) => {
    setGiftPoint(event.target.value);
  };

  const imageChangeHandler = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedImage(event.target.files[0]);
      setSelectedImageName(event.target.files[0].name);
    }
  };

  const addGiftHandler = (event) => {
    event.preventDefault();

    if (selectedImageName && giftTitle && giftPrice && giftPoint) {
      const giftData = {
        giftImgName: selectedImageName,
        giftName: giftTitle,
        giftPrice: giftPrice,
        giftPoint: giftPoint,
      };

      let formData = new FormData();

      formData.append("giftImg", selectedImage);

      axios({
        method: "POST",
        url: "/gifts/giftimgupload",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));

      axios
        .post("/gifts/add_gift", giftData)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));

      updateGifts(true);

      isOpen(false);
    }
  };

  const cancelFormHandler = () => {
    isOpen(false);
  };

  return (
    <div className="addgift-container">
      <form className="addgift-form" onSubmit={addGiftHandler}>
        <div className="addgift-form__inputs">
          <input
            className="addgift-form__input"
            type="text"
            value={giftTitle}
            onChange={titleChangeHander}
          />
          <input
            className="addgift-form__input"
            type="number"
            value={giftPrice}
            onChange={priceChangeHander}
          />
          <input
            className="addgift-form__input"
            type="number"
            value={giftPoint}
            onChange={pointChangeHander}
          />
          <label className="addgift-form__input-image">
            <input
              accept="image/*"
              type="file"
              hidden
              onChange={imageChangeHandler}
            />
            Upload Image
          </label>
        </div>
        <div className="addgift-form__submits">
          <button className="addgift-form__submit-button" type="submi">
            Add
          </button>
          <button
            className="addgift-form__submit-button"
            onClick={cancelFormHandler}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

GiftForm.propTypes = {
  updateGifts: PropTypes.func,
  isOpen: PropTypes.func,
};

export default GiftForm;
