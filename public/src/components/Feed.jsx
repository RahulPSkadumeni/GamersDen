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

const Feed = ({ userId, isProfile = false }) => {
  // const [posts, setPosts] = useState([]);
  // const [user, setUser] = useState([]);
  const [text, setText] = useState([]);
  const [content, setContent] = useState("");
  const user = useSelector((state) => state.user);
  const posts = useSelector((state) => state.posts);

  const dispatch = useDispatch();
  // console.log(user);
  useEffect(() => {
    try {
      fetchPost();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const fetchPost = async () => {
    if (isProfile) {
      // console.log("profikeeeeeeee");
      let res = await axios.get("/posts/profile/" + userId);
      // console.log(res);
      // setPosts(res.data);
      dispatch(
        setPosts({
          posts: res.data,
        })
      );
    } else {
      // console.log("timelineeeeeeeeeeeeeeeeee");
      const res = await axios.get("posts/timeline/" + user._id);
      // console.log(res);
      dispatch(
        setPosts({
          posts: res.data,
        })
      );
    }
  };
  // fetchPost();
  console.log(posts.length);
  // const Feed = () => {
  //   const [posts, setPosts] = useState([]);
  //   // const [user, setUser] = useState([]);
  //   const [text, setText] = useState([]);

  //   const user = useSelector((state) => state.user);
  //   console.log(user);
  //   useEffect(() => {
  //     try {
  //       const fetchPost = async () => {
  //         const res =
  //           //  await axios.get("/posts/profile/" + user.userName)
  //           // :

  //           await axios.get("posts/timeline/" + user._id);
  //         console.log(res);
  //         setPosts(res.data);
  //       };
  //       fetchPost();
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }, []);

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
    <div className="bg-slate-600">
      <div className="feedWrapper" style={{ margin: "100px" }}>
        {/* <input
          className="bg-white"
          type="text"
          onChange={(e) => setText(e.target.value)}
        /> */}
        {/* <Banner /> */}
        <Share content={content} setContent={setContent} />

        {posts.map((p) => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
};

export default Feed;
