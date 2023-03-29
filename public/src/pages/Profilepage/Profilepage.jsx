import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import Feed from "../../components/Feed";
import HeaderComponent from "../../components/HeaderComponent";
import ProfileComponent from "../../components/ProfileComponent";
import Rightbar from "../../components/Rightbar";
import { Link } from "react-router-dom";
import Sidebar from "../../components/Sidebar";

import "./Profilepage.css";
const Profilepage = () => {
  // const [user, setUser] = useState({});
  const [Profile, setProfile] = useState({});
  // const user = useSelector((state) => state.user);
  const { userId } = useParams();

  const token = useSelector((state) => state.token);

  console.log(userId);
  useEffect(() => {
    // const fetchUser = async () => {
    //   const res = await axios.get(`http://localhost:3001/users/${userId}}`, {
    //     method: "GET",
    //     headers: { Authorization: `Bearer ${token}` },
    //   });

    //   setProfile(res.data);
    // };
    // fetchUser();

    getUser();
  }, []);

  const getUser = async () => {
    const response = await fetch(`http://localhost:3001/users/${userId}`, {
      // const response = await fetch(`http://localhost:3001/users/${user._id}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    console.log(data);
    // setUser(data);
    setProfile(data);
  };

  console.log("Profile");
  console.log(Profile);

  if (!Profile) {
    return null;
  }
  // const {
  //   firstName,
  //   lastName,
  //   userName,
  //   location,
  //   occupation,
  //   phoneNumber,
  //   friends,
  // } = Profile;

  // useParams().username;
  // console.log("username");
  // console.log(userName);

  return (
    <>
      <div className="bg-emerald-700">
        <HeaderComponent />
        <div className="profile">
          <Sidebar />

          <ProfileComponent />
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
              <div className="pt-28 pb-5 mt-5 ">
                {Profile && (
                  <h3 className="text-slate-50   text-center">
                    {Profile.firstName}
                    {Profile.lastName}
                  </h3>
                )}
                {/* <h6 className="text-slate-50  text-center">@{Profile.userName}</h6> */}
                <div className="status">
                  <p className="text-white  text-center">
                    {Profile.desc}
                    {/* <br /> “Do more of what makes you happy.” */}
                  </p>
                </div>
              </div>
            </div>
            <div className="profileRightBottom">
              <div className="bg-slate-600 w-3/4 h-v100%">
                {" "}
                <Feed userId={userId} isProfile={true} />
              </div>

              <Rightbar />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profilepage;
