import React from "react";
import Navbar from "../Navbar/Navbar";
import "./home.css";
import Search from "../search/Search";
import Footer from "../footer/Footer";

const Home = () => {
  return (
    <div className="chatterly-home">
      {/* <Navbar /> */}
      <div className="custom-bg">
        <br />
        <Search />
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default Home;
