import React, { useEffect } from "react";
import "./Feed.css";
import Logo2 from "./Logo/Logo2";
import Post from "./Post/Post";
import Share from "./share/Share";
import { Posts } from "./dummyData";
import Banner from "./Banner/Banner";
import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const GroupFeed = () => {
  // const [group, setGroup] = useState();
  const { groupId } = useParams();
  const [group, setGroup] = useState(null);
  const [groupPost, setGroupPost] = useState([]);
  console.log("????????????", groupId);
  useEffect(() => {
    try {
      fetchPosts();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const fetchPosts = async () => {
    let res = await axios.get(`/group/${groupId}/posts`);
    console.log("res is", res);
    setGroupPost(res.data);
    console.log("groupPost", groupPost);
  };

  return (
    <div className="feed">
      <div className="feedWrapper">
        {/* <Banner /> */}
        <Share groupId={groupId} />
        {groupPost.map((p) => (
          <Post key={p.id} post={p} />
        ))}
      </div>
    </div>
  );
};

export default GroupFeed;
