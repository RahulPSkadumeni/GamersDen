import axios from "axios";
import Axios from "../../utils/axios";

export const getMessages = async (id) => {
  try {
    const { data } = await Axios.get(`message/${id}`);
    // console.log("<<<< axios getMessage", data);
    return data;
  } catch (err) {
    console.log(err);
  }
};
export const addMessage = async (message) => {
  try {
    const data = await Axios.post("message/", message);
    console.log("<<<< axios getMessage", data);
    return data;
  } catch (err) {
    console.log(err);
  }
};
