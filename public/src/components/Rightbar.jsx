import React from "react";
import FriendsCard from "./friendsCard/FriendsCard";
import FriendsList from "./friendslist/FriendsList";
import FriendsRequestCard from "./friendsRequestCard/FriendsRequestCard";
import Profile from "./ProfileCard/Profile";
import "./Rightbar.css";

import { User } from "../dummyData";
import { useSelector } from "react-redux";

export default function Rightbar({ profile }) {
  const user = useSelector((state) => state.user);

  if (!user) {
    return null;
  }
  const HomeRightBar = () => {
    return (
      <>
        <Profile />
        <h4 className="rightbarTitle"> Friends</h4>

        <FriendsCard className="rightbarFriendList" />

        <h4 className="rightbarTitle"> Friends Request</h4>

        <FriendsRequestCard className="rightbarFriendList" />
      </>
    );
  };

  const ProfileRightBar = () => {
    const user = useSelector((state) => state.user);

    if (!user) {
      return null;
    }
    return (
      // "rigthBarFriend">
      //   <div className="rightbar"></div>

      <div>
        <Profile />
        <h1 className="RIghtbarTitle">User Information Title </h1>
        <div className="Rightbarinfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfokey">City:</span>
            <span className="rightbarInfoValue">{user.city}:</span>
          </div>

          <div className="rightbarInfoItem">
            <span className="rightbarInfokey">From:</span>
            <span className="rightbarInfoValue">{user.from}</span>
          </div>

          <div className="rightbarInfoItem">
            <span className="rightbarInfokey">occupation:</span>
            <span className="rightbarInfoValue">{user.occupation}</span>
          </div>
        </div>

        <h4>User Friends</h4>

        <FriendsList />
        {/* <FriendsCard/> */}
      </div>
    );
  };

  return (
    <div div className="rightbar">
      <ProfileRightBar />
    </div>
  );
}
