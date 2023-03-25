import axios from "axios";
import React from "react";
import { useEffect } from "react";

import { useState } from "react";
import { format } from "timeago.js";
import { likeimg, AiTwotoneLike } from "react-icons/ai";
import { Link } from "react-router-dom";
const Post = ({ post }) => {
  const [like, setLike] = useState(post.like);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`users/${post.userId}`);
      console.log(res.data);
      setUser(res.data);
    };
    fetchUser();
    console.log(fetchUser());
  }, [post.userId]);

  // useEffect(() => {
  //   try {
  //     const fetchPost = async () => {
  //       const res = await axios.get("posts/timeline/641b143fd898a10c1edab56d");
  //       console.log(res);
  //       setPosts(res.data);
  //     };
  //     fetchPost();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, []);

  const likeHandler = () => {
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };
  // const user = Users.filter((u) => u.id === 1);
  // console.log(user[0].username);
  // console.log(post);
  return (
    <div className="bg-zinc-400/90 font-mono w rounded-3xl text-center  p-6 mt-5">
      <div className="postWrapper">
        <div className="postTop">
          <Link to={`profile/${user.userName}`}>
            <div className="postTopLeft">
              {/* https://png.pngtree.com/png-clipart/20190516/original/pngtree-purple-samurai-e-sports-logo-for-gaming-mascot-or-twitch-profile-png-image_4278450.jpg */}
              <img
                className="h-10 rounded-full"
                src={
                  user.profilePicture
                    ? PF + user.profilePicture
                    : "https://www.kindpng.com/picc/m/22-223863_no-avatar-png-circle-transparent-png.png"
                }
                alt="p"
              />
              <span className=" pl-2 text-xl  font-semibold">
                {user.userName}
              </span>
            </div>
          </Link>
          <span className=" text-cyan-900 pl-2 align-baseline">
            {format(post.createdAt)}
          </span>
          {/* <MoreVert/> */}

          <div className="postTopRight"></div>
        </div>
        <div className="postCenter">
          <span className=" ">
            {post?.des}
            {/* After just a single round of Player Unknown's Battlegrounds Mobile,
            I was hooked. The game runs well and feels authentic. It even has
            that delicious tension that I love from the PC version of the…{" "} */}
          </span>
          <img
            className="object-cover object-fill"
            // src={PF + "/public/images/post"}
            src="https://i0.wp.com/ramenswag.com/wp-content/uploads/2018/12/101-PlayerUnknown_s-Battlegrounds-HD-Wallpapers-_-Background-Images-...-1.jpg?resize=1024%2C576&ssl=1"
            alt=""
          />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              onClick={likeHandler}
              className="likeIcon"
              src="https://www.clipartmax.com/png/small/218-2189156_red-heart-emoji-icon-vector-symbol-instagram-heart-icon-png.png"
              alt=""
            />
            <img
              onClick={likeHandler}
              className="likeIcon"
              src="https://www.clipartmax.com/png/small/98-986734_top-masonic-blogs-comment-png.png"
              alt=""
            />
            <span onClick={likeHandler} className="postLikeCounter">
              {post.likes.length} people like it
            </span>
            <span className="postacommentText">{post.comment} comments</span>
          </div>
          {/* <MoreVert /> */}
        </div>
      </div>
    </div>
  );
};

export default Post;
