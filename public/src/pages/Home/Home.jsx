import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import BodyComponent from "../../components/Body/BodyComponent";
import HeaderComponent from "../../components/HeaderComponent";

import "./Home.css";

const Home = () => {
  const isAuth = Boolean(useSelector((state) => state.token));

  // useEffect(() => {
  //   console.log(isAuth);
  // }, []);
  return (
    <div className="HomeContainer">
      {/* <HeaderComponent /> */}

      <BodyComponent />
    </div>
  );
};

export default Home;
