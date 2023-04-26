import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import BodyComponent from "../../components/Body/BodyComponent";
import HeaderComponent from "../../components/HeaderComponent";
import state from "../state";

import "./Home.css";
import { NavBars } from "../../components/NavBar_New/Nav";
import BASE_URL from "../../utils/baseurl";

const Home = () => {
  const isAuth = Boolean(useSelector((state) => state.token));

  const [user, setUser] = useState(null);
  const navigate = useNavigate;
  const token = useSelector((state) => state.token);
  const currentUser = useSelector((state) => state.user);
  // console.log(currentUser._id);
  const getUser = async () => {
    // const response = await fetch(`http://localhost:3001/users/${userId}`, {
    const response = await fetch(BASE_URL + `/users/${currentUser._id}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };
  useEffect(() => {
    getUser();
  }, []);

  if (!user) {
    return null;
  }
  const {
    firstName,
    lastName,
    userName,
    location,
    occupation,
    phoneNumber,
    friends,
  } = user;

  // console.log(currentUser);

  // useEffect(() => {
  //   console.log(isAuth);
  // }, []);

  // console.log(state);
  return (
    <div className="h-screen  ">
      {/* <div className="bg-blue-500 text-white text-center py-4 rounded-lg text-5xl ">
        1
      </div>
      <div className="bg-blue-500 text-white text-center  mt-3 text-5xl ">
        2
      </div> */}
      {/* <NavBars /> */}
      <HeaderComponent />
      <BodyComponent />
    </div>
  );
};

export default Home;
