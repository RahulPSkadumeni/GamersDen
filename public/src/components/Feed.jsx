import React, { useEffect, useState } from "react";
import "./Feed.css";
import Logo2 from "./Logo/Logo2";
import Post from "./Post/Post";
import Share from "./share/Share";

import { Posts } from "../../src/dummyData";
import Banner from "./Banner/Banner";
import axios from "axios";
import { getPosts } from "../api/postApi/post";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../pages/state";
import Create from "./share/Create";

const Feed = ({ userId, isProfile = false }) => {
  const [text, setText] = useState([]);
  const [content, setContent] = useState("");
  const user = useSelector((state) => state.user);
  const posts = useSelector((state) => state.posts);
  console.log("postssss", posts);
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      fetchPost();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const fetchPost = async () => {
    if (isProfile) {
      console.log("profikeeeeeeee");
      let res = await axios.get("posts/profile/" + userId);
      console.log("profile post", res.data);
      // setPosts(res.data);
      dispatch(
        setPosts({
          posts: res.data,
        })
      );
    } else {
      console.log("timelineeeeeeeeeeeeeeeeee");
      const res = await axios.get("posts/timeline/" + user._id);
      console.log("timeline post", res.data);
      dispatch(
        setPosts({
          posts: res.data,
        })
      );
    }
  };
  // fetchPost();
  console.log(posts.length);

  return (
    <div className=" bg-gradient-to-br from-purple-500 via-pink-500 to-indigo-500 font-mono w rounded-3xl text-center p-6 mt-5">
      <div style={{ margin: "100px" }}>
        <Share content={content} setContent={setContent} />

        {posts &&
          posts.map((p) => <Post className="max-w-44" key={p._id} post={p} />)}
      </div>
    </div>
  );
};

export default Feed;
