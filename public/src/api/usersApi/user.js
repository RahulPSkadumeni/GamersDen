// all user apis are listed here//
import axios from "axios";
import { useSelector } from "react-redux";

export const login = async (email, password) => {
  const response = await fetch("http://localhost:3001/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return response.json();
};

export const register = async (userDetails) => {
  console.log("userdetail in register api", userDetails);
  console.log(typeof userDetails.phoneNumber);
  const response = await fetch("http://localhost:3001/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userDetails),
  });

  return response.json();
};

export const OtpLogin = async (phoneNo) => {
  const response = await fetch("http://localhost:3001/auth/OtpLogin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ phoneNo }),
  });
  return response.json();
};

export const checkPhone = async (phoneNo) => {
  console.log("inside checkphone api", phoneNo);
  const response = await fetch("http://localhost:3001/auth/checkphone", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ phoneNo }),
  });

  return response.json();
};
export const createJwt = async (phoneNo) => {
  console.log("inside createJwt api", phoneNo);
  const response = await fetch("http://localhost:3001/auth/createJwt", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ phoneNo }),
  });
  return response.json();
};

export const fetchAllUsers = async () => {
  try {
    const { data } = await axios.get("http://localhost:3001/users/allUsers");
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
    const { data } = await axios.get(
      `http://localhost:3001/users/suggestedUser/${userId}`
    );
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const friendRequest = async (id, currentUserId) => {
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
    const { data } = await axios.post(
      `http://localhost:3001/users/${currentUserId}/${id}`
    );
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
};
