import React, { useState } from "react";
import { MdHome } from "react-icons/md";
import { RiCommunityFill, RiInboxArchiveFill } from "react-icons/ri";
import { Navigate, useNavigate } from "react-router-dom";
import SuggestedUsers from "../friendsSuggesition/SuggestedUsers";
import { IoNotificationsSharp } from "react-icons/io5";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";

function MenuComponent() {
  const navigate = useNavigate();
  const [NotificationCount, setNotificationCount] = useState(null);
  const token = useSelector((state) => state.token);
  const user = useSelector((state) => state.user);
  console.log(user);
  useEffect(() => {
    const fetchNotification = async () => {
      console.log("token", token);
      const data = await axios.post(`/api/notification/unread`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(data.data.length);
      setNotificationCount(data.data.length);
    };
    fetchNotification();
  }, []);
  return (
    <>
      <div class="flex flex-col items-left w-72 h-full overflow-hidden text-white-300 bg-slate-700 rounded-3xl ">
        <button
          onClick={() => {
            navigate("/");
          }}
          class="bg-gray-500/70 bg-opacity-50 backdrop-filter backdrop-blur-lg ml-12  w-60 group relative inline-flex mt-16  justify-center overflow-hidden rounded-md  py-3 font-medium tracking-wide text-white text-2xl shadow-2xl border border-slate-100/20 hover:scale-110 transition duration-300 ease-out  hover:shadow-fuchsia-600 active:translate-y-1"
        >
          <span class="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0  transition duration-300 ease-out  group-hover:opacity-100  group-active:opacity-90"></span>
          <span class="relative flex flex-row ">
            <MdHome className="text-3xl mr-2" /> Home
          </span>
        </button>
        <button
          onClick={() => {
            navigate("/groups");
          }}
          class="bg-gray-500/70 bg-opacity-50 backdrop-filter backdrop-blur-lg ml-12  w-60 group relative inline-flex mt-4  justify-center overflow-hidden rounded-md  py-3 font-medium tracking-wide text-white text-2xl shadow-2xl border border-slate-100/20 hover:scale-110 transition duration-300 ease-out  hover:shadow-fuchsia-600 active:translate-y-1"
        >
          <span class="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0  transition duration-300 ease-out  group-hover:opacity-100  group-active:opacity-90"></span>
          <span class="relative flex flex-row  ">
            <RiCommunityFill className="text-3xl mr-2" /> Community
          </span>
        </button>
        <button
          onClick={() => {
            navigate("/chat");
          }}
          class=" bg-gray-500/70 bg-opacity-50 backdrop-filter backdrop-blur-lg ml-12  w-60 group relative inline-flex mt-4  justify-center overflow-hidden rounded-md  py-3 font-medium tracking-wide text-white text-2xl shadow-2xl border border-slate-100/20 hover:scale-110 transition duration-300 ease-out  hover:shadow-fuchsia-600 active:translate-y-1"
        >
          <span class="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0  transition duration-300 ease-out  group-hover:opacity-100  group-active:opacity-90"></span>
          <span class="relative flex flex-row ">
            <RiInboxArchiveFill className="text-3xl mr-2" /> Inbox
          </span>
        </button>
        <button
          onClick={() => {
            navigate("/notification");
          }}
          class="bg-gray-500/70 bg-opacity-50 backdrop-filter backdrop-blur-lg ml-12  w-60 group relative inline-flex mt-4  justify-center overflow-hidden rounded-md  py-3 font-medium tracking-wide text-white text-2xl shadow-2xl border border-slate-100/20 hover:scale-110 transition duration-300 ease-out  hover:shadow-fuchsia-600 active:translate-y-1"
        >
          <span class="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0  transition duration-300 ease-out  group-hover:opacity-100  group-active:opacity-90"></span>
          <span class="relative flex flex-row ">
            <IoNotificationsSharp className="text-3xl mr-2" />{" "}
            <span className="topbarIconBadge absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              {NotificationCount}
            </span>{" "}
            Notifications
          </span>
        </button>

        <ul className="p-4 ml-4 text-gray-200 ">
          Suggested Users
          <SuggestedUsers />
        </ul>
      </div>
    </>
  );
}

export default MenuComponent;
