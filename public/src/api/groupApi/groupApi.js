import axios from "axios";
import Axios from "../../utils/axios";

export const groupSuggestion = async (id) => {
  console.log("<<<< axio");
  try {
    const { data } = await Axios.get(`group/allgroup/${id}`);
    console.log("<<<< axios getMessage", data);
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const UsersGroupSuggestion = async (id) => {
  console.log("<<<< axio");
  try {
    const { data } = await Axios.get(`group/userGroup/${id}`);
    console.log("<<<< axios getMessage", data);
    return data;
  } catch (err) {
    console.log(err);
  }
};
