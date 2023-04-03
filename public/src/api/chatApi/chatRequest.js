import axios from "axios";

export const userChats = async (userId) => {
  let data = await axios.get(`http://localhost:3001/chat/${userId}`);

  return data;
};

// export const getUser = async (userId) => {
//   let data = await axios.get(`http://localhost:3001/users/${userId}`);

//   return data;
// };
