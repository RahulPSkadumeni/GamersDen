import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import Axios from "../../../utils/axios";
function Comment({ postId, comment, setAllComments, userId }) {
  const [replay, setReplay] = useState(null);
  const currentUserId = useSelector((state) => state.user._id);
  const token = useSelector((state) => state.token);
  console.log("LLLLLLLLLLLLLL", token);
  const user = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  //   const [allComments, setAllComments] = useState([]);
  //   useEffect(() => {
  //     const fetchUser = async () => {
  //       const res = await axios.get(`users/${post.userId}`);
  //       console.log(res.data);
  //       setUser(res.data);
  //     };
  //     fetchUser();
  //     // console.log(fetchUser());
  //   }, [post.userId]);

  const deleteComment = async (id) => {
    console.log("first");

    const data = await Axios.delete(`comment/delete/${id}`);
    console.log(data);
    let updatedComments = await Axios.get(`comment/post/${postId}`);
    console.log("updatedComments", updatedComments.data);
    setAllComments(updatedComments.data);
  };

  const deleteReplay = async (commentId, replayId) => {
    console.log(commentId, replayId);
    console.log("delete replay");
    const data = await Axios.delete(
      `comment/replay-delete/${commentId}/${replayId}`
    );

    let updatedComments = await Axios.get(`comment/post/${postId}`);
    console.log("updatedComments", updatedComments.data);
    setAllComments(updatedComments.data);
    // let allcomment = allComments.filter((comment) => comment._id !== id);
    // setAllComments(allcomment);
  };
  const postReplay = async () => {
    const response = await Axios.post(
      "comment/create-replay",
      {
        CommentText: replay,
        // user: user._id,
        commentId: comment._id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response);
    let updatedComments = await Axios.get(`comment/post/${postId}`);
    console.log("updatedComments", updatedComments.data);
    setAllComments(updatedComments.data);
  };

  return (
    <>
      <div className="flex-col bg-white mt-3">
        <div className="flex flex-col justify-between items-center m-1 p-1 rounded-sm bg-gray-100">
          <p className="mr-2 ">{comment.CommentText}</p>
          <button
            onClick={() => {
              setOpen(!open);
            }}
            className="bg-gray-300  rounded-all p-1 m-1"
          >
            show replay
          </button>

          <div className="flex items-center">
            <div className="  text-right">
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
              {comment.user._id === currentUserId ? (
                <button
                  onClick={(e) => deleteComment(comment._id)}
                  className="bg-red-500 hover:text-red-600  text-white rounded-full px-3 focus:outline-none"
                >
                  X
                </button>
              ) : null}
              {/* {open && ( */}
              <div className="flex flex-col text-right ">
                {open &&
                  comment?.replies?.map((reply) => (
                    <div className="flex">
                      {reply?.commentText}

                      {reply?.user === currentUserId ? (
                        <button
                          onClick={(e) => deleteReplay(comment._id, reply._id)}
                          className="bg-red-500 text-white font-bold my-1 px-2 rounded-full hover:shadow-lg transform transition-all duration-500 hover:-translate-y-1"
                        >
                          X
                        </button>
                      ) : null}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Comment;
