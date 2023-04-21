import React from "react";
import Feed from "../../components/Feed";
import GroupFeed from "../../components/GroupFeed";
import HeaderComponent from "../../components/HeaderComponent";
import ProfileComponent from "../../components/ProfileComponent";
import Rightbar from "../../components/Rightbar";

import Sidebar from "../../components/Sidebar";
import GroupRightbar from "./GroupRightbar";
import axios from "axios";
import "./Profilepage.css";
import { useEffect } from "react";
import { useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const GroupHome = () => {
  const navigate = useNavigate();
  const { groupId } = useParams();
  const [group, setGroup] = useState(null);
  const [groupPost, setGroupPost] = useState([]);
  console.log("????????????", groupId);
  const user = useSelector((state) => state.user);
  useEffect(() => {
    try {
      fetchGroup();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const fetchGroup = async () => {
    console.log(groupId);
    let res = await axios.get(`/group/groupDetails/${groupId}/`);
    console.log("group is", res.data.groupName);
    setGroup(res.data);
    console.log("group", group);
  };

  const leaveGroup = async (event) => {
    event.preventDefault();
    const confirmDelete = window.confirm(
      "Are you sure you want to leave  this community?"
    );
    if (confirmDelete) {
      console.log("groupId>>>>>>>>>>_______>>>>>", groupId);
      let res = await axios.post(
        `http://localhost:3001/group/leave/${groupId}`,
        {
          userId: user._id,
        }
      );

      console.log(res);
      navigate("/");
    }
  };

  return (
    <div>
      {/* <HeaderComponent /> */}
      <div className="profile">
        {/* <Sidebar /> */}

        {/* <ProfileComponent/> */}
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              {/* <img  className="profileCoverImage" src="../../assets/post/3.jpeg" alt="coverImg" /> */}
              <img
                className="profileCoverImage"
                src="https://www.fbcoverlover.com/covers/mortal-kombat-2-Facebook-Cover.jpg?i"
                alt="coverImg"
              />
              {/* <img  className="profileUserImage" src="../../assets/person/7.jpeg" alt="profileAvatar" /> */}
              <img
                className="profileUserImage"
                src="https://i.pinimg.com/564x/0f/e6/11/0fe611de8b4a8747c317715e4e77ec0d.jpg"
                alt="profileAvatar"
              />
            </div>
            <div className="profileInfo">
              <h>{group?.groupName}</h>
              <h4>
                <button
                  className="bg-red-900 rounded-full p-3 text-white absolute top-0 right-0 m-3"
                  onClick={leaveGroup}
                >
                  Leave
                </button>
              </h4>
              <div className="status">
                <p>{group?.description}</p>
              </div>
            </div>
          </div>
          <div className="profileRightBottom">
            <GroupFeed />
            {/* <GroupRightbar /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupHome;
