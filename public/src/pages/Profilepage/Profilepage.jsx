import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Feed from "../../components/Feed";
import HeaderComponent from "../../components/HeaderComponent";
import ProfileComponent from "../../components/ProfileComponent";
import Rightbar from "../../components/Rightbar";

import Sidebar from "../../components/Sidebar";

import "./Profilepage.css";
const Profilepage = () => {
  const [user, setUser] = useState({});

  const username = useParams().username;
  console.log("username");
  console.log(username);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?username=${username}`);
      setUser(res.data);
    };
    fetchUser();
  }, [username]);

  return (
    <>
      <div className="bg-emerald-700">
        <HeaderComponent />
        <div className="profile">
          <Sidebar />

          {/* <ProfileComponent /> */}
          <div className="profileRight">
            <div className="profileRightTop">
              <div className="profileCover">
                {/* <img  className="profileCoverImage" src="../../assets/post/3.jpeg" alt="coverImg" /> */}
                <img
                  className="profileCoverImage"
                  src={
                    // user.coverPicture ||
                    "https://www.fbcoverlover.com/covers/game4.jpg?i"
                  }
                  alt="coverImg"
                />
                {/* <img  className="profileUserImage" src="../../assets/person/7.jpeg" alt="profileAvatar" /> */}
                <img
                  className="profileUserImage"
                  // src={`http://localhost:3001/assets/person/${image}?`}
                  src={
                    // user.profilePicture ||
                    "https://i.pinimg.com/564x/cf/fc/1d/cffc1d6458cfeae198045145673b351b.jpg"
                  }
                  alt="profileAvatar"
                />
              </div>
              <div className="profileInfo">
                <h3 className="text-slate-50">Rahul P S</h3>
                <h6 className="text-slate-50">@Rahulps</h6>
                <div className="status">
                  <p className="text-white">
                    “Gamer zone, be careful.” <br /> “Do more of what makes you
                    happy.”
                  </p>
                </div>
              </div>
            </div>
            <div className="profileRightBottom">
              <Feed username={username} />
              <Rightbar user={user} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profilepage;
