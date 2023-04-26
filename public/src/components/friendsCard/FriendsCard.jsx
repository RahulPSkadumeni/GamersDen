import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchFriends } from "../../api/usersApi/user";
import "./FriendsCard.css";

const FriendsCard = () => {
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);

  const userId = user._id;
  const [friends, setFriends] = useState([]);

  const getFriendlist = async () => {
    let friendlist = await fetchFriends(userId);
    console.log(">>f>>>", friendlist);
    setFriends(friendlist);
  };

  useEffect(() => {
    getFriendlist();
  }, []);

  return (
    <div>
      <ul className="rightbarFriendList">
        {friends.map((friend) => (
          <li key={friend._id} className="rigthBarFriend">
            <div className="rightBarProfileImageContainer">
              <img
                className="rightbarprofileImage"
                // src="https://wallpapers.com/images/featured-full/cool-profile-pictures-4co57dtwk64fb7lv.jpg"
                src={
                  friend.picturePath
                    ? friend.picturePath
                    : "https://wallpapers.com/images/featured-full/cool-profile-pictures-4co57dtwk64fb7lv.jpg"
                }
                alt=""
              />
              <span className="rigbtbarOnline"></span>
            </div>
            <div className="rigthBarFriendCardData">
              <span className="rigbtbarUsername">
                {" "}
                {friend.firstName} {friend.lastName}
              </span>

              <span className="lastSeen">45 min ago</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FriendsCard;
