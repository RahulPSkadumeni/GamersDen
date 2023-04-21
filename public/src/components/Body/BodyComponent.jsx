import React from "react";
import { useSelector } from "react-redux";
import Feed from "../Feed";
import Rightbar from "../Rightbar";
import RightbarHome from "../RightbarHome";

// import Rightbar from '../Rightbars'
import Sidebar from "../Sidebar";
import "./BodyComponent.css";
import NavigationCard from "../share/NavigationCard/NavigationCard";

const BodyComponent = () => {
  const user = useSelector((state) => state.user);
  // console.log(user);
  let owner = true;
  return (
    // <div className="homeContainer ">
    //   {/* <NavigationCard /> */}
    //   <Sidebar  />
    //   <Feed />
    //   <RightbarHome />
    // </div>
    <div className="flex flex-col md:flex-row w-full h-screen">
      <Sidebar className="  md:w-1/5 h-full" />
      <div className="flex-grow md:w-3/5 h-full">
        <Feed className="h-full" />
      </div>
      <RightbarHome className="hidden md:block md:w-1/5 h-full" />
    </div>
  );
};

export default BodyComponent;
