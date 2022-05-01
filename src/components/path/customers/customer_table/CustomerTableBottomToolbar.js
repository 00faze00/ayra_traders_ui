import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

import CustomerEditForm from "./CustomerEditForm";

import "./CustomerTableBottomToolbar.css";

const CustomerTableBottomToolbar = ({ rowSelected, setSelectedRows, selectedRowsId, setSelectedRowsId, refereshCusts }) => {

  const [custData, setCustData] = useState();
  const [editClicked, setEditClicked] = useState(false);
  
  const custDeleteHandler = (event) => {
    const tempArray = selectedRowsId;
    tempArray.forEach((curr, index) => {
      axios.post("/customers/remove_customer", {
        "custId": curr
      }).then(res => console.log(res)).catch(err => console.log(err));
      setSelectedRows(curr => --curr);
      setSelectedRowsId(curr => curr.splice(index, 1));
    });
    refereshCusts(true);
  };

  const custEditHandler = async (event) => {
    const id = selectedRowsId[0];
    const res = await axios.get("/customers/"+id);
    const data = res.data;
    setCustData(data);
    setEditClicked(true);
    // console.log(data); 
  };

  return (
    <>
      {rowSelected > 0 && (
        <div>
          {
            editClicked && <CustomerEditForm custData={custData} refereshCusts={refereshCusts} setEditClicked={setEditClicked} />
          }
          <div className="ct-b-toolbar__wrapper">
            <div className="ct-b-toolbar">
              <div className="ctbt-info">
                <div className="ctbt-count">
                  <label>{rowSelected}</label>
                </div>
              </div>
              <div className="ctbt-options">
                <div className="ctbt-del-btn">
                  <button
                      className="button"
                      style={{ backgroundColor: "#fff", color: "#000" }}
                      onClick={custDeleteHandler}
                    >
                      Delete
                    </button>
                  {rowSelected === 1 && (
                    <button
                      className="button"
                      style={{ backgroundColor: "#fff", color: "#000" }}
                      onClick={custEditHandler}
                    >
                      Edit
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

CustomerTableBottomToolbar.propTypes = {
  rowSelected: PropTypes.number,
  setSelectedRows: PropTypes.func,
  refereshCusts: PropTypes.func,
  selectedRowsId: PropTypes.array,
  setSelectedRowsId: PropTypes.func,
};

export default CustomerTableBottomToolbar;
