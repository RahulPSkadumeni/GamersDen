import React from "react";
// import Logo from "../../assets";
import "./LogoSearch.css";
import { UilSearch } from "@iconscout/react-unicons";
const LogoSearch = () => {
  return (
    <div className="LogoSearch">
      {/* <img src={Logo} alt="logo" /> */}
      <img
        className="logo"
        src="https://pixel77.com/wp-content/uploads/2014/11/20-Creative-Chat-Logo-Designs-19.png"
        alt="logo"
      />
      <div className="Search">
        <input type="text" placeholder="#Explore" />
        <div className="s-icon">
          <UilSearch />
        </div>
      </div>
    </div>
  );
};

export default LogoSearch;
