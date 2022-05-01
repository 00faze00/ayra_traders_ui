import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


import Navbar from "../ui/navbar/Navbar";
import { Customers, Gifts, Welcome } from "../path";

// import css here
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <Router>
        <Navbar />
        <Routes >
          {/* <Route path='/' exact={true} component={Welcome} />
          <Route path='/customers' component={Customers} />
          <Route path='/gifts' component={Gifts} /> */}
          <Route path='/' exact={true} element={<Welcome />} />
          <Route path='/customers' element={<Customers />} />
          <Route path='/gifts' element={<Gifts />} />
        </Routes>
      </Router>
    </div>
  );
};

export default Home;
