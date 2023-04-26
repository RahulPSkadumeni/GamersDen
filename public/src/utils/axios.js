import axios from "axios";
const Axios = axios.create({
  // baseURL: "http://localhost:3000",
  baseURL: "https://gamersden.tech/api",
  //baseURL: "https://gamersden.tech/",

  // withCredentials: true,
  // headers: {
  //   "Content-type": "application/json",
  //   Accept: "application/json",
  // },
});

export default Axios;
