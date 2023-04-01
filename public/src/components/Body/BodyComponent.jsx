import React from "react";
import { useSelector } from "react-redux";
import Feed from "../Feed";
import Rightbar from "../Rightbar";
import RightbarHome from "../RightbarHome";

// import Rightbar from '../Rightbars'
import Sidebar from "../Sidebar";
import "./BodyComponent.css";

const BodyComponent = () => {
  const user = useSelector((state) => state.user);
  // console.log(user);
  let owner = true;
  return (
    <div className="homeContainer">
      <Sidebar />
      {/* <Feed />
      <RightbarHome /> */}
    </div>
  );
};

export default BodyComponent;
