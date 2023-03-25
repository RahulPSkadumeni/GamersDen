import React, { useEffect, useState } from "react";
import "./Feed.css";
import Logo2 from "./Logo/Logo2";
import Post from "./Post/Post";
import Share from "./share/Share";

import { Posts } from "../../src/dummyData";
import Banner from "./Banner/Banner";
import axios from "axios";
import { getPosts } from "../api/postApi/post";

const Feed = ({ username }) => {
  const [posts, setPosts] = useState([]);

  const [text, setText] = useState([]);

  useEffect(() => {
    try {
      const fetchPost = async () => {
        const res = username
          ? await axios.get("/posts/profile/" + username)
          : await axios.get("posts/timeline/641b143fd898a10c1edab56d");
        console.log(res);
        setPosts(res.data);
      };
      fetchPost();
    } catch (error) {
      console.log(error);
    }
  }, []);

  // useEffect(() => {
  //   const allPost = async () => {
  //     let data = await getPosts("641b143fd898a10c1edab56d");
  //     console.log(data);
  //     setPosts(data);
  //   };
  //   allPost();
  //   console.log(posts);
  // }, []);

  return (
    <div className="feed">
      <div className="feedWrapper" style={{ margin: "100px" }}>
        {/* <input
          className="bg-white"
          type="text"
          onChange={(e) => setText(e.target.value)}
        /> */}
        {/* <Banner /> */}
        <Share />

        {posts.map((p) => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
};

export default Feed;
