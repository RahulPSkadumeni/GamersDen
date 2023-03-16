import React from "react";
import FriendsList from "../../components/friendslist/FriendsList";
import FriendsCard from "../../components/friendsRequestCard/FriendsRequestCard";

import "./Rightbar.css";
import Profile from "../../components/ProfileCard/Profile";
import FriendsRequestCard from "../../components/friendsRequestCard/FriendsRequestCard";

export default function GroupRightbar({ profile }) {
  const HomeRightBar = () => {
    return (
      <>
        {/* <Profile/> */}
        <h4 className="rightbarTitle">New Request</h4>

        <FriendsCard className="rightbarFriendList" />

        <h4 className="rightbarTitle"> Members</h4>

        <FriendsList className="rightbarFriendList" />
      </>
    );
  };

  return (
    <div className="rightbar">
      <HomeRightBar />
    </div>
  );
}
