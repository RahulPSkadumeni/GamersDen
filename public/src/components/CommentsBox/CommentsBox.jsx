import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import Comment from "../Post/Comment/Comment";
import Axios from "../../utils/axios";

function CommentsBox({ post }) {
  const [comment, setComment] = useState(null);
  const token = useSelector((state) => state.token);
  const user = useSelector((state) => state.user);
  const [allComments, setAllComments] = useState([]);
  console.log(user);
  console.log(post._id);
  const postComment = async () => {
    const response = await Axios.post(
      "comment/createComment/",
      {
        CommentText: comment,
        user: user._id,
        post: post._id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response);

    setAllComments([response.data, ...allComments]);
  };

  const getComments = async () => {
    const data = await Axios.get(`comment/post/${post._id}`);
    console.log(data);
    setAllComments(data.data);
  };

  useEffect(() => {
    getComments();
    console.log(allComments);
  }, []);

  return (
    <>
      <div>
        <div className="flex-col">
          <input
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
          </button>
          {allComments?.map((data) => (
            <Comment
              postId={post._id}
              comment={data}
              setAllComments={setAllComments}
              userId={post.userId}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default CommentsBox;
