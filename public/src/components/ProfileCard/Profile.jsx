import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./Profile.css";

const Profile = () => {
  // const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const user = useSelector((state) => state.user);
  // console.log(user);
  const navigate = useNavigate;
  const token = useSelector((state) => state.token);
  const { userId } = useParams();
  const getUser = async () => {
    const response = await fetch(`http://localhost:3001/users/${userId}`, {
      // const response = await fetch(`http://localhost:3001/users/${user._id}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    console.log(data);
    // setUser(data);
    setProfile(data);
  };

  useEffect(() => {
    getUser();
  }, []);
  console.log("????????????????", profile);
  if (!user) {
    return null;
  }
  // const {
  //   firstName,
  //   lastName,
  //   userName,
  //   location,
  //   occupation,
  //   phoneNumber,
  //   friends,
  // } = user;
  if (!profile) {
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
  } = profile;

  console.log(profile.firstName);
  return (
    <div className="profilecard">
      <div
        className="card-container"
        onClick={() => navigate(`/profile/${user._Id}`)}
      >
        <div className="image-container">
          <img
            className="round"
            src="https://i.pinimg.com/564x/cf/fc/1d/cffc1d6458cfeae198045145673b351b.jpg"
            alt="user"
          />
        </div>

        <h3 href="#">{userName}</h3>

        <h4>{user.email}</h4>
        <p>
          {user.desc} <br /> “Do more of what makes you happy.”
        </p>
        <p className="font-bold">{user.phoneNumber}</p>
        <div></div>
      </div>
    </div>
  );
};

export default Profile;
