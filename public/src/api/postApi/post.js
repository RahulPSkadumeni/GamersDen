import { useDispatch } from "react-redux";
import { setPosts } from "../../pages/state";
import axios from "axios";

export const getPosts = async (id) => {
  const response = await fetch(`http://localhost:3001/posts/timeline/${id}`, {
    method: "GET",
    // headers: { "Content-Type": "application/json" },
  });
  return response.json();
};
const dispatch = useDispatch;
export const fetchPost = async (userId) => {
  console.log("fetch posts");
  let res = await axios.get("/posts/profile/" + userId);
  // console.log(res);
  // setPosts(res.data);
  dispatch(
    setPosts({
      posts: res.data,
    })
  );
};

export const fetchAllPost = async () => {
  console.log("fetching all posts");
  try {
    const { data } = await axios.get(`http://localhost:3001/users/allPost`);
    console.log("kkkk", data);
    return data;
  } catch (error) {
    console.log(error);
  }
};
