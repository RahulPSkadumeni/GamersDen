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
import TimeAgo from "react-timeago";
import CommentsBox from "../CommentsBox/CommentsBox";
import ReactTimeago from "react-timeago";
import Axios from "../../utils/axios";

const Post = ({ post }) => {
  const [like, setLike] = useState(post.like);
  const dispatch = useDispatch();
  // const [isLiked, setIsLiked] = useState(false);
  const currentUserId = useSelector((state) => state.user._id);
  const [user, setUser] = useState({});
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const isliked = post.likes.includes(currentUserId);
  const token = useSelector((state) => state.token);
  const [comment, setComment] = useState(null);
  const [replay, setReplay] = useState(null);
  const [open, setOpen] = useState(false);
  const [allComments, setAllComments] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await Axios.get(`users/${post.userId}`);
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
    const like = await Axios.put(`/posts/${post._id}/like`, {
      userId: currentUserId,
    });
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
    if (post.userId === currentUserId) {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this post?"
      );
      if (confirmDelete) {
        // delete post code here

        const deletepost = await Axios.delete(`posts/delete/${post._id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: {
            userId: currentUserId,
          },
        });
        console.log(deletepost);
        dispatch(
          setPost({
            post: like.data,
          })
        );
      }
    }
  };
  // const postComment = async () => {
  //   const response = await axios.post(
  //     "http://localhost:3001/comment/createComment/",
  //     {
  //       CommentText: comment,
  //       user: user._id,
  //       post: post._id,
  //     },
  //     {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     }
  //   );
  //   console.log(response);
  //   setAllComments([response.data, ...allComments]);
  // };
  const getComments = async (e) => {
    e.preventDefault();
    const data = await Axios.get(`comment/post/${post._id}`);
    console.log(data);
    setAllComments(data.data);
    setOpen(!open);
  };

  // const deleteComment = async (id) => {
  //   console.log("first");

  //   const data = await axios.delete(
  //     `http://localhost:3001/comment/delete/${id}`
  //   );
  //   console.log(data);
  //   let allcomment = allComments.filter((comment) => comment._id !== id);
  //   setAllComments(allcomment);
  // };
  // const user = Users.filter((u) => u.id === 1);
  // console.log(user[0].username);
  // console.log(post);

  // const postReplay = async () => {
  //   const response = await axios.post(
  //     "http://localhost:3001/comment/create-replay",
  //     {
  //       CommentText: replay,
  //       user: user._id,
  //       commentId: comment._id,
  //     },
  //     {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     }
  //   );
  //   console.log(response);
  //   setAllComments([response.data, ...allComments]);
  // };

  return (
    <div className="bg-gray-500/40 bg-opacity-50 backdrop-filter backdrop-blur-lg font-mono w-full rounded-3xl text-center p-6 mt-5 shadow-lg">
      <div className="postWrapper">
        <div className="postTop">
          <Link to={`profile/${post.userId}`}>
            <div className="postTopLeft">
              {/* https://png.pngtree.com/png-clipart/20190516/original/pngtree-purple-samurai-e-sports-logo-for-gaming-mascot-or-twitch-profile-png-image_4278450.jpg */}
              <img
                className="h-10 rounded-full "
                src={
                  user.profilePicture
                    ? PF + user.profilePicture
                    : "https://www.kindpng.com/picc/m/22-223863_no-avatar-png-circle-transparent-png.png"
                }
                alt="p"
              />
              <span className=" pl-1 text-xl  font-semibold">
                {user.userName}
              </span>
              <span className=" text-cyan-900 pl-4 text-left ">
                {/* {format(post.createdAt)} */}
                <ReactTimeago date={new Date(post.createdAt).getTime()} />
                {/* <TimeAgo date={new Date(post.createdAt).getTime()} /> */}
              </span>
            </div>
          </Link>

          {/* <MoreVert/> */}
          <div className="w-11/12"></div>
          {post.userId === currentUserId && (
            <button
              onClick={deleteHandler}
              className=" p-3 text-center text-red-700   rounded-full  hover:bg-red-700 hover:text-white "
            >
              <BsTrashFill size={"30px"} />
            </button>
          )}
          <div> </div>
        </div>
        <div className="text-white text-left text-xl  w-10/12">{post?.des}</div>
        <div className="postCenter">
          <span className="text-left">
            {post?.des}
            {/* After just a single round of Player Unknown's Battlegrounds Mobile,
            I was hooked. The game runs well and feels authentic. It even has
            that delicious tension that I love from the PC version of the…{" "} */}
          </span>
          <img
            className=" w-430 h-768"
            src={post?.image}
            // src="https://i0.wp.com/ramenswag.com/wp-content/uploads/2018/12/101-PlayerUnknown_s-Battlegrounds-HD-Wallpapers-_-Background-Images-...-1.jpg?resize=1024%2C576&ssl=1"
            alt=""
          />
          {post.image}
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            {isliked ? (
              <img
                onClick={likeHandler}
                className="likeIcon"
                src="https://www.vectorico.com/wp-content/uploads/2019/01/heart-icon-300x300.png"
                alt=""
              />
            ) : (
              <img
                onClick={likeHandler}
                className="likeIcon "
                src="data:image/svg+xml;base64,PHN2ZyBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLW1pdGVybGltaXQ9IjIiIHZpZXdCb3g9IjAgMCAyNCAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJtNy4yMzQgMy4wMDRjLTIuNjUyIDAtNS4yMzQgMS44MjktNS4yMzQgNS4xNzcgMCAzLjcyNSA0LjM0NSA3LjcyNyA5LjMwMyAxMi41NC4xOTQuMTg5LjQ0Ni4yODMuNjk3LjI4M3MuNTAzLS4wOTQuNjk3LS4yODNjNC45NzctNC44MzEgOS4zMDMtOC44MTQgOS4zMDMtMTIuNTQgMC0zLjM1My0yLjU4LTUuMTY4LTUuMjI5LTUuMTY4LTEuODM2IDAtMy42NDYuODY2LTQuNzcxIDIuNTU0LTEuMTMtMS42OTYtMi45MzUtMi41NjMtNC43NjYtMi41NjN6bTAgMS41YzEuOTkuMDAxIDMuMjAyIDEuMzUzIDQuMTU1IDIuNy4xNC4xOTguMzY4LjMxNi42MTEuMzE3LjI0MyAwIC40NzEtLjExNy42MTItLjMxNC45NTUtMS4zMzkgMi4xOS0yLjY5NCA0LjE1OS0yLjY5NCAxLjc5NiAwIDMuNzI5IDEuMTQ4IDMuNzI5IDMuNjY4IDAgMi42NzEtMi44ODEgNS42NzMtOC41IDExLjEyNy01LjQ1NC01LjI4NS04LjUtOC4zODktOC41LTExLjEyNyAwLTEuMTI1LjM4OS0yLjA2OSAxLjEyNC0yLjcyNy42NzMtLjYwNCAxLjYyNS0uOTUgMi42MS0uOTV6IiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48L3N2Zz4="
                alt=""
              />
            )}
            <span onClick={likeHandler} className="postLikeCounter">
              {post.likes.length} people like it
            </span>
            <span className="postacommentText">{post.comment} </span>{" "}
            {/* {post.comment.length} comments */}
            {/* <button onClick={getComments}>comments</button> */}
            <img
              onClick={getComments}
              src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0xMiAxYy02LjMzOCAwLTEyIDQuMjI2LTEyIDEwLjAwNyAwIDIuMDUuNzM5IDQuMDYzIDIuMDQ3IDUuNjI1bC0xLjk5MyA2LjM2OCA2Ljk0Ni0zYzEuNzA1LjQzOSAzLjMzNC42NDEgNC44NjQuNjQxIDcuMTc0IDAgMTIuMTM2LTQuNDM5IDEyLjEzNi05LjYzNCAwLTUuODEyLTUuNzAxLTEwLjAwNy0xMi0xMC4wMDd6bTAgMWM2LjA2NSAwIDExIDQuMDQxIDExIDkuMDA3IDAgNC45MjItNC43ODcgOC42MzQtMTEuMTM2IDguNjM0LTEuODgxIDAtMy40MDEtLjI5OS00Ljk0Ni0uNjk1bC01LjI1OCAyLjI3MSAxLjUwNS00LjgwOGMtMS4zMDgtMS41NjQtMi4xNjUtMy4xMjgtMi4xNjUtNS40MDIgMC00Ljk2NiA0LjkzNS05LjAwNyAxMS05LjAwN3ptLTUgNy41Yy44MjggMCAxLjUuNjcyIDEuNSAxLjVzLS42NzIgMS41LTEuNSAxLjUtMS41LS42NzItMS41LTEuNS42NzItMS41IDEuNS0xLjV6bTUgMGMuODI4IDAgMS41LjY3MiAxLjUgMS41cy0uNjcyIDEuNS0xLjUgMS41LTEuNS0uNjcyLTEuNS0xLjUuNjcyLTEuNSAxLjUtMS41em01IDBjLjgyOCAwIDEuNS42NzIgMS41IDEuNXMtLjY3MiAxLjUtMS41IDEuNS0xLjUtLjY3Mi0xLjUtMS41LjY3Mi0xLjUgMS41LTEuNXoiLz48L3N2Zz4="
            ></img>
            {/* <input
              placeholder="post a comment"
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            /> */}
            {/* <input
              className="bg-white border border-gray-300 rounded-md px-4 py-2 w-full 
             focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Post a comment"
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button
              onClick={postComment}
              className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-bold py-2 px-4 rounded-full hover:shadow-lg transform transition-all duration-500 hover:-translate-y-1"
            >
              Post
            </button> */}
          </div>
          {/* <MoreVert /> */}
          {open && <CommentsBox post={post} />}
        </div>
        {/* <div className="flex-col bg-white mt-3">
          {allComments?.map((comment) => (
            <div className="flex 	align-content: flex-end;">
              <p className=" m-1 p-1 rounded-sm">{comment.CommentText}</p>
              <p></p>
              <button
                onClick={(e) => deleteComment(comment._id)}
                className=" text-red-500"
              >
                X
              </button>
            </div>
          ))}
        </div> */}
        {/* <div className="bg-white bg-opacity-40 rounded-3xl mt-3 p-4 backdrop-filter backdrop-blur-lg shadow-lg">
          {allComments?.map((comment) => (
            <div className="flex items-center justify-between mb-3">
              <p className="p-2 rounded-sm bg-gray-100 bg-opacity-80">
                {comment.CommentText}
              </p>
              <button
                onClick={(e) => deleteComment(comment._id)}
                className="text-red-500 hover:text-red-600 focus:outline-none"
              >
                X
              </button>
            </div>
          ))}
        </div> */}
        {/* <div className="flex-col bg-white mt-3">
          {allComments?.map((comment) => (
            <div className="flex justify-between items-center m-1 p-1 rounded-sm bg-gray-100">
              <p className="mr-2">{comment.CommentText}</p>
              <div className="flex items-center">
                <input
                  type="text"
                  placeholder="Reply"
                  className="mr-2 py-1 px-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={replay}
                  onChange={(e) => setReplay(e.target.value)}
                ></input>{" "}
                <button
                  onClick={postReplay}
                  className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-bold py-2 px-6 mr-5 rounded-full hover:shadow-lg transform transition-all duration-500 hover:-translate-y-1"
                >
                  Post
                </button>
                <button
                  onClick={(e) => deleteComment(comment._id)}
                  className="bg-red-500 hover:text-red-600  text-white rounded-full px-3 focus:outline-none"
                >
                  X
                </button>
                {comment.replies}.map(()=>( ))
              </div>
            </div>
          ))}
        </div> */}
      </div>
    </div>
  );
};

export default Post;
