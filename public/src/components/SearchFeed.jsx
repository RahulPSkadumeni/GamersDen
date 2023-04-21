import React from "react";
import "./Feed.css";
import Logo2 from "./Logo/Logo2";
import Post from "./Post/Post";
import Share from "./share/Share";
import { Posts } from "./dummyData";
import Banner from "./Banner/Banner";
import GroupJoin from "./GroupCard/GroupJoin";
import { useState } from "react";
import {
  groupSuggestion,
  UsersGroupSuggestion,
} from "../api/groupApi/groupApi";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import CreateGroupModal from "./CreateGroupModal/CreateGroupModal";
import CreateGroupForm from "./CreateGroupModal/createGroupForm";

const SearchFeed = () => {
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);

  const userId = user._id;
  const [groups, setGroups] = useState([]);
  const [UsersGroups, setUsersGroups] = useState([]);

  const [showModal, setShowModal] = useState(false);

  function toggleModal() {
    setShowModal(!showModal);
  }
  useEffect(() => {
    console.log("hereee");
    try {
      const getGroups = async () => {
        let groupList = await groupSuggestion(userId);

        setGroups(groupList);
      };
      getGroups();
    } catch (error) {
      console.log(error);
    }
  }, []);
  console.log(">>>>", groups);

  useEffect(() => {
    console.log("hereee");
    try {
      const getGroups = async () => {
        let groupList = await UsersGroupSuggestion(userId);
        setUsersGroups(groupList);
      };
      getGroups();
    } catch (error) {
      console.log(error);
    }
  }, []);
  console.log(">>>>", UsersGroups);

  return (
    <div className="Gfeed bg-slate-600">
      <div className="feedWrapper">
        <CreateGroupForm />

        {/* <Banner/> */}

        {/* <h2>Popular right now</h2>
         
          </div> */}
        <div className="FeaturedCommunity pl-5 pt-5 ">
          <h3> Featured Community</h3>{" "}
          <div>
            {/* <button
              onClick={toggleModal}
              className="m-3 p-3  rounded-3xl bg-pink-900  hover:bg-lime-700"
            >
              Create new Group{" "}
            </button> */}
            {/* <CreateGroupModal /> */}
          </div>
        </div>
        <div className="clsgrp w-">
          {groups.map((group) => (
            <GroupJoin key={group.id} post={group} />
          ))}
        </div>

        <div className="FeaturedCommunity pl-5 pt-5 ">
          <h3> Users Community</h3>
        </div>
        <div className="clsgrp w-">
          {UsersGroups.map((group) => (
            <GroupJoin key={group.id} post={group} />
          ))}

          {/* <GroupJoin /> */}
        </div>
      </div>
    </div>
  );
};

export default SearchFeed;
