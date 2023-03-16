import React from "react";
import "./FriendsRequestCard.css";
// import { Button } from '@mui/material'

const FriendsRequestCard = () => {
  return (
    <div>
      <ul className="rightbarFriendList">
        <li className="rigthBarFriend">
          <div className="rightBarProfileImageContainer">
            <img
              className="rightbarprofileImage"
              src="https://wallpapers.com/images/featured-full/cool-profile-pictures-4co57dtwk64fb7lv.jpg"
              alt=""
            />
            <span className="rigbtbarOnline"></span>
          </div>
          <div className="rigthBarFriendCardData">
            <span className="rigbtbarUsername">
              {" "}
              Yadhu Yadhu <button className="confirmButton">
                Confirm
              </button>{" "}
              <button className="DeleteButton">Delete</button>{" "}
            </span>

            <span className="lastSeen"></span>
          </div>
        </li>

        <li className="rigthBarFriend">
          <div className="rightBarProfileImageContainer">
            <img
              className="rightbarprofileImage"
              src="https://wallpapers.com/images/featured-full/cool-profile-pictures-4co57dtwk64fb7lv.jpg"
              alt=""
            />
            <span className="rigbtbarOnline"></span>
          </div>
          <div className="rigthBarFriendCardData">
            <span className="rigbtbarUsername">
              {" "}
              Anas Anas A A<button className="confirmButton">
                Confirm
              </button>{" "}
              <button className="DeleteButton">Delete</button>{" "}
            </span>

            <span className="lastSeen"></span>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default FriendsRequestCard;
