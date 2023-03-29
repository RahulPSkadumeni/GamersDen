import React from "react";
import { Route } from "react-router-dom";
import { MdHome } from "react-icons/md";
import { IoNotificationsSharp } from "react-icons/io5";
import { RiInboxArchiveFill, RiCommunityFill } from "react-icons/ri";
import { MdOutlineVideoLibrary } from "react-icons/md";
import "./sidebar.css";
// import {HomeSharp,NotificationsNoneSharp,ForwardToInboxSharp,VideoLibrarySharp,PeopleSharp}  from "@mui/icons-material"
const Sidebar = () => {
  return (
    <div className="sideBar">
      Explore
      <div className="sidbarWrap">
        <ul className="sidebarList">
          <li className="SidebarListItem">
            <MdHome className="SidebarIcon" />
            <span className="SidebarListItemText">Home</span>
          </li>
          <li className="SidebarListItem">
            {/* <NotificationsNoneSharp className='SidebarIcon'/> */}
            <IoNotificationsSharp className="SidebarIcon" />
            <span href="/notification" className="SidebarListItemText">
              {" "}
              Notifications
            </span>
          </li>
          <li className="SidebarListItem">
            {/* <ForwardToInboxSharp className='SidebarIcon'/> */}
            <RiInboxArchiveFill className="SidebarIcon" />
            <span className="SidebarListItemText"> Inbox</span>
          </li>
          <li className="SidebarListItem">
            {/* <PeopleSharp className='SidebarIcon'/> */}
            <RiCommunityFill className="SidebarIcon" />
            <span className="SidebarListItemText">Community</span>
          </li>
          {/* <li className='SidebarListItem'>
            <VideoLibrarySharp className='SidebarIcon'/>
            <MdOutlineVideoLibrary className='SidebarIcon'/>
            <span className='SidebarListItemText'>Video</span>
          </li> */}
          <div class="flex flex-col space-y-8 h-screen items-center justify-center bg-[#000]">
            {/* <!-- Button 1 --> */}
            <button class="group relative inline-flex items-center justify-center overflow-hidden rounded-md px-12 py-3 font-medium tracking-wide text-white text-xl shadow-2xl border border-slate-100/20 hover:scale-110 transition  duration-300 ease-out  hover:shadow-teal-500 active:translate-y-1 hover:border-none">
              <span class="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500 opacity-0  transition duration-300 ease-out  group-hover:opacity-100  group-active:opacity-90"></span>
              <span class="relative">Green to Blue</span>
            </button>

            {/* <!-- Button 2 --> */}
            <button class="group relative inline-flex items-center justify-center overflow-hidden rounded-md px-12 py-3 font-medium tracking-wide text-white text-xl shadow-2xl border border-slate-100/20 hover:scale-110 transition duration-300 ease-out  hover:shadow-blue-600 active:translate-y-1 hover:border-none">
              <span class="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0  transition duration-300 ease-out  group-hover:opacity-100  group-active:opacity-90 hover:border-none"></span>
              <span class="relative">Blue to Purple</span>
            </button>

            {/* <!-- Button 3 --> */}
            <button class="group relative inline-flex items-center justify-center overflow-hidden rounded-md px-8 py-3 font-medium tracking-wide text-white text-xl shadow-2xl border border-slate-100/20 hover:scale-110 transition duration-300 ease-out  hover:shadow-orange-600 active:translate-y-1">
              <span class="absolute inset-0 bg-gradient-to-r from-orange-400 via-pink-500  to-purple-500 opacity-0  transition duration-300 ease-out  group-hover:opacity-100  group-active:opacity-90"></span>
              <span class="relative">Orange to Purple</span>
            </button>

            {/* <!-- Button 4 --> */}
            <button class="group relative inline-flex items-center justify-center overflow-hidden rounded-md px-8 py-3 font-medium tracking-wide text-white text-xl shadow-2xl border border-slate-100/20 hover:scale-110 transition duration-300 ease-out  hover:shadow-fuchsia-600 active:translate-y-1">
              <span class="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0  transition duration-300 ease-out  group-hover:opacity-100  group-active:opacity-90"></span>
              <span class="relative">Indigo to Purple</span>
            </button>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
