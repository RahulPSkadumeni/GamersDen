import axios from "axios";
import React, { useEffect, useState } from "react";
import { getUser } from "../../api/usersApi/user";

function Conversation({ data, currentUser, online }) {
  // console.log(".....", currentUser);

  // its the opposite member data not current user data
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // console.log(data);
    const userId = data.members.find((id) => id !== currentUser);

    try {
      const getUserData = async () => {
        const data = await getUser(userId);

        setUserData(data);
      };
      getUserData(userId);
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      <div className="follower conversation">
        <div>
          {online && <div className="online-dot"></div>}
          <img
            src="https://i.pinimg.com/564x/cf/fc/1d/cffc1d6458cfeae198045145673b351b.jpg"
            // {
            //   userData?.profilePicture
            //     ? process.env.REACT_APP_PUBLIC_FOLDER + userData.profilePicture
            //     : process.env.REACT_APP_PUBLIC_FOLDER + "defaultProfile.png"
            // }
            alt="Profile"
            className="followerImage"
            style={{ width: "50px", height: "50px" }}
          />
          <div className="name" style={{ fontSize: "0.8rem" }}>
            <span>
              {userData?.firstName} {userData?.lastName}
            </span>
            <span style={{ color: online ? "#51e200" : "#808080" }}>
              {/* {online ? "Online" : "Offline"}. */}
              {!online ? "Offline" : ""}
            </span>
          </div>
        </div>
      </div>
      <hr style={{ width: "85%", border: "0.1px solid #ececec" }} />
    </>
  );
}

export default Conversation;
