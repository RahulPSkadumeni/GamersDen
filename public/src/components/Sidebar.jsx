import React from 'react'
import { Route } from 'react-router-dom'
import{MdHome} from "react-icons/md"
import {IoNotificationsSharp}from "react-icons/io5"
import{RiInboxArchiveFill,RiCommunityFill}from "react-icons/ri"
import{MdOutlineVideoLibrary}from "react-icons/md"
import "./sidebar.css"
// import {HomeSharp,NotificationsNoneSharp,ForwardToInboxSharp,VideoLibrarySharp,PeopleSharp}  from "@mui/icons-material"
const Sidebar = () => {
  return (
    <div className='sideBar'>
      Explore
      <div className="sidbarWrap">
        <ul className='sidebarList'>
          <li className='SidebarListItem' >
          <MdHome className='SidebarIcon' />
            <span className='SidebarListItemText'>Home</span>
          </li>
          <li className='SidebarListItem'>
            {/* <NotificationsNoneSharp className='SidebarIcon'/> */}
            <IoNotificationsSharp className='SidebarIcon'/>
            <span href="/notification" className='SidebarListItemText'> Notifications</span>
          </li>
          <li className='SidebarListItem'>
            {/* <ForwardToInboxSharp className='SidebarIcon'/> */}
            <RiInboxArchiveFill className='SidebarIcon'/>
            <span className='SidebarListItemText'> Inbox</span>
          </li>
          <li className='SidebarListItem'>
            {/* <PeopleSharp className='SidebarIcon'/> */}
            <RiCommunityFill className='SidebarIcon'/>
            <span className='SidebarListItemText'>Community</span>
          </li><li className='SidebarListItem'>
            {/* <VideoLibrarySharp className='SidebarIcon'/> */}
            <MdOutlineVideoLibrary className='SidebarIcon'/>
            <span className='SidebarListItemText'>Video</span>
          </li>
          



        </ul>

      </div>

    </div>
  )
}

export default Sidebar