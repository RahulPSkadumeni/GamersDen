import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { BsTrashFill } from "react-icons/bs";
import { useState } from "react";
// import { format } from "timeago.js";
import { likeimg, AiTwotoneLike } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "../../pages/state";

const Post = ({ post }) => {
  const [like, setLike] = useState(post.like);
  const dispatch = useDispatch();
  // const [isLiked, setIsLiked] = useState(false);
  const currentUserId = useSelector((state) => state.user._id);
  const [user, setUser] = useState({});
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const isliked = post.likes.includes(currentUserId);
  const token = useSelector((state) => state.token);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`users/${post.userId}`);
      console.log(res.data);
      setUser(res.data);
    };
    fetchUser();
    // console.log(fetchUser());
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

  const likeHandler = async () => {
    const like = await axios.put(
      `http://localhost:3001/posts/${post._id}/like`,
      {
        userId: currentUserId,
      }
    );
    console.log(like);
    // if()
    // setLike();
    dispatch(
      setPost({
        post: like.data,
      })
    );

    // setLike(isLiked ? like - 1 : like + 1);
    // setIsLiked(!isLiked);
  };

  const deleteHandler = async () => {
    console.log(currentUserId);
    const deletepost = await axios.delete(
      `http://localhost:3001/posts/delete/${post._id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          userId: currentUserId,
        },
      }
    );

    console.log(deletepost);

    dispatch(
      setPost({
        post: post.data,
      })
    );
  };

  // const user = Users.filter((u) => u.id === 1);
  // console.log(user[0].username);
  // console.log(post);
  return (
    <div className="bg-slate-400/90 font-mono w rounded-3xl text-center  p-6 mt-5">
      <div className="postWrapper">
        <div className="postTop">
          <Link to={`profile/${post.userId}`}>
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
            {/* {format(post.createdAt)} */}
          </span>
          {/* <MoreVert/> */}
          <div className="w-11/12"></div>
          <button
            onClick={deleteHandler}
            className=" p-3 text-center text-red-700   rounded-full  hover:bg-red-700 hover:text-white "
          >
            <BsTrashFill size={"30px"} />
          </button>
          <div> </div>
        </div>
        <div className="left-0 w-10/12"> {post?.des}</div>
        <div className="postCenter">
          <span className="text-left">
            {/* {post?.des} */}
            {/* After just a single round of Player Unknown's Battlegrounds Mobile,
            I was hooked. The game runs well and feels authentic. It even has
            that delicious tension that I love from the PC version of the…{" "} */}
          </span>
          <img
            className=" w-430 h-768"
            src={post.picturePath}
            // src="https://i0.wp.com/ramenswag.com/wp-content/uploads/2018/12/101-PlayerUnknown_s-Battlegrounds-HD-Wallpapers-_-Background-Images-...-1.jpg?resize=1024%2C576&ssl=1"
            alt=""
          />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            {isliked ? (
              <img
                onClick={likeHandler}
                className="likeIcon"
                src="https://www.clipartmax.com/png/small/218-2189156_red-heart-emoji-icon-vector-symbol-instagram-heart-icon-png.png"
                alt=""
              />
            ) : (
              <img
                onClick={likeHandler}
                className="likeIcon"
                src="https://www.clipartmax.com/png/small/98-986734_top-masonic-blogs-comment-png.png"
                alt=""
              />
            )}

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
