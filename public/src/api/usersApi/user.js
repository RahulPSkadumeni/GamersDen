// all user apis are listed here//
import axios from "axios";
import { useSelector } from "react-redux";
import Axios from "../../utils/axios";
import BASE_URL from "../../utils/baseurl";
export const adminlogin = async (email, password) => {
  const response = await fetch(BASE_URL + "/admin/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return response.json();
};
export const login = async (email, password) => {
  const response = await Axios.post("auth/login", { email, password });
  return response.data;
};

export const register = async (userDetails) => {
  console.log("userdetail in register api", userDetails);
  console.log(typeof userDetails.phoneNumber);
  const response = await fetch(BASE_URL + "/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userDetails),
  });

  return response.json();
};

export const changePasssword = async (userDetails, ph) => {
  console.log(ph);
  console.log("user detail in register api", userDetails);
  console.log(typeof userDetails.password);
  const response = await fetch(BASE_URL + `users/updatePassword/${ph}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userDetails),
  });

  return response.json();
};

export const OtpLogin = async (phoneNo) => {
  const response = await fetch(BASE_URL + "auth/OtpLogin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ phoneNo }),
  });
  return response.json();
};

export const checkPhone = async (phoneNo) => {
  console.log("inside checkphone api", phoneNo);
  const response = await fetch(BASE_URL + "auth/checkphone", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ phoneNo }),
  });

  return response.json();
};
export const createJwt = async (phoneNo) => {
  console.log("inside createJwt api", phoneNo);
  const response = await fetch(BASE_URL + "/auth/createJwt", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ phoneNo }),
  });
  return response.json();
};

export const fetchAllUsers = async () => {
  try {
    const { data } = await Axios.get("users/allUsers");
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const getUser = async (userId) => {
  // console.log(">>>>>>><<<<<", userId);

  try {
    const { data } = await Axios.get(`users/${userId}`);
    // console.log("<<<< axios", data);
    return data;
  } catch (err) {
    console.log(err);
  }
};
// export const fetchSuggestedUser = async (userId, token) => {
//   return new Promise(async (resolve, reject) => {
//     const { data } = await fetch(
//       `http://localhost:3001/users/suggestedUser/${userId}`,
//       {
//         method: "GET",
//         headers: { Authorization: `Bearer ${token}` },
//       }
//     );
//     resolve(data);
//     console.log(">>>>>" + data);
//   });
// };

export const fetchSuggestedUser = async (userId, token) => {
  try {
    const { data } = await Axios.get(`users/suggestedUser/${userId}`);
    return data;
  } catch (err) {
    console.log(err);
  }
};
export const fetchFriends = async (userId) => {
  console.log("in fetch friends");
  try {
    const { data } = await Axios.get(`users/${userId}/friends`);

    console.log("in fetch friends", data);
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const friendRequest = async (id, currentUserId, token) => {
  console.log("inside fetch req ", id);
  // const userId = id;
  // const response = await fetch(
  //   `http://localhost:3001/users/${currentUserId}/${id}`,
  //   {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: userId,
  //   }
  // );
  // return response.json();

  try {
    const { data } = await Axios.post(`users/${currentUserId}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
};
