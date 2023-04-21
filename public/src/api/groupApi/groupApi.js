import axios from "axios";

export const groupSuggestion = async (id) => {
  console.log("<<<< axio");
  try {
    const { data } = await axios.get(
      `http://localhost:3001/group/allgroup/${id}`
    );
    console.log("<<<< axios getMessage", data);
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const UsersGroupSuggestion = async (id) => {
  console.log("<<<< axio");
  try {
    const { data } = await axios.get(
      `http://localhost:3001/group/userGroup/${id}`
    );
    console.log("<<<< axios getMessage", data);
    return data;
  } catch (err) {
    console.log(err);
  }
};
