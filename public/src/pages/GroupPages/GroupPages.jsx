import React from "react";
import "./GroupPages.css";
import HeaderComponent from "../../components/HeaderComponent";
import Sidebar from "../../components/Sidebar";

import RightbarHome from "../../components/RightbarHome";
import SearchFeed from "../../components/SearchFeed";

export default function GroupPages() {
  return (
    <div>
      <HeaderComponent />

      <div className="profile">
        <Sidebar />
        <SearchFeed />
        <RightbarHome />
      </div>
    </div>
  );
}
