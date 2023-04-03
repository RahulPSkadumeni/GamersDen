import axios from "axios";

export const getMessages = async (id) => {
  try {
    const { data } = await axios.get(`http://localhost:3001/message/${id}`);
    // console.log("<<<< axios getMessage", data);
    return data;
  } catch (err) {
    console.log(err);
  }
};
export const addMessage = async (message) => {
  try {
    const data = await axios.post("http://localhost:3001/message/", message);
    console.log("<<<< axios getMessage", data);
    return data;
  } catch (err) {
    console.log(err);
  }
};
