import React, { useEffect, useState } from "react";
import "./Feed.css";
import Logo2 from "./Logo/Logo2";
import Post from "./Post/Post";
import Share from "./share/Share";
import { Posts } from "./dummyData";
import Banner from "./Banner/Banner";
import SingleNotification from "./Post/SingleNotification";
import { useSelector } from "react-redux";
import axios from "axios";

const NotificationFeed = () => {
  const token = useSelector((state) => state.token);
  const [Notifications, setNotifications] = useState(null);
  const user = useSelector((state) => state.user);
  const markAllNotificationsAsRead = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3001/notification/read`,
        { userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      setNotifications(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  console.log(user);
  useEffect(() => {
    const fetchNotification = async () => {
      console.log("token", token);
      const data = await axios.post(
        `http://localhost:3001/notification/all`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(data.data);
      setNotifications(data.data);
    };
    fetchNotification();
  }, []);

  console.log();
  return (
    <div className="feed bg-gradient-to-br from-purple-500 via-pink-500 to-indigo-500 font-mono w rounded-3xl text-center p-6 ">
      <div className="feedWrapper">
        <button
          className="bg-sky-600 m-4 p-4 right-0 rounded-full "
          onClick={markAllNotificationsAsRead}
        >
          Mark all as read
        </button>
        {/* {Posts.map((p)=>(
           <Post key={p.id} post={p}/>
        )
         
          
        )} */}

        <SingleNotification Notifications={Notifications} />
      </div>
    </div>
  );
};

export default NotificationFeed;
