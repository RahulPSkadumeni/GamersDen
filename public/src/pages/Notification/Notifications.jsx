import React from "react";
import Feed from "../../components/Feed";
import HeaderComponent from "../../components/HeaderComponent";
import NotificationFeed from "../../components/NotificationFeed";
import Rightbar from "../../components/Rightbar";
import RightbarGroup from "../../components/RightbarGroup.jsx";
import Sidebar from "../../components/Sidebar";
import "./Notifications.css";
import RightbarHome from "../../components/RightbarHome";

export default function Notifications() {
  return (
    <>
      {/* <Sidebar/> */}
      <HeaderComponent />
      <div className="profile  mt-3">
        <Sidebar />
        <NotificationFeed />
        {/* <Rightbar /> */}
        <RightbarHome />
      </div>
    </>
  );
}
