import React from "react";
import "./Post.css";
import { useState } from "react";
// import { MoreVert } from '@mui/icons-material'
// import {MoreVert} from '@mui/icons-material';
import { Users } from "../../dummyData";
const Post = ({ post }) => {
  const [like, setLike] = useState(post.like);
  const [isLiked, setIsLiked] = useState(false);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const likeHandler = () => {
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };
  // const user = Users.filter((u) => u.id === 1);
  // console.log(user[0].username);
  // console.log(post);
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            {/* https://png.pngtree.com/png-clipart/20190516/original/pngtree-purple-samurai-e-sports-logo-for-gaming-mascot-or-twitch-profile-png-image_4278450.jpg */}
            <img
              className="postProfileImg"
              src={Users.filter((u) => u.id === post?.userId)[0].profilePicture}
              alt="profilepic"
            />
          </div>
          <span className="postUserName">
            {Users.filter((u) => u.id === post?.userId)[0].username}
          </span>
          <span className="postDate">{post.date}</span>
          {/* <MoreVert/> */}

          <div className="postTopRight"></div>
        </div>
        <div className="postCenter">
          <span className="postText">
            {post?.desc}
            {/* After just a single round of Player Unknown's Battlegrounds Mobile,
            I was hooked. The game runs well and feels authentic. It even has
            that delicious tension that I love from the PC version of the…{" "} */}
          </span>
          <img
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
            <span className="postLikeCounter">{like} people like it</span>
            <span className="postacommentText">{post.comment} comments</span>
          </div>
          {/* <MoreVert /> */}
        </div>
      </div>
    </div>
  );
};

export default Post;
