import React from 'react'
import { Route } from 'react-router-dom'
import "./Adminsidebar.css"
// import {HomeSharp,NotificationsNoneSharp,ForwardToInboxSharp,VideoLibrarySharp,PeopleSharp}  from "@mui/icons-material"
const AdminSidebar = () => {
  return (
    <div className='sideBar'>
      <>
      <div className="adminpic">
        <div className="games">
          <img className="game" src="https://www.proctorgallagherinstitute.com/wp-content/uploads/2019/11/peter-brindely-pic-updated.jpg" />
         
        </div>
        <p className='AdminName'>ADMIN </p>
      </div>
      </>


      Explore
      <>
      <div className="sidbarWrap">
        <ul className='sidebarList'>
          <li className='SidebarListItem' >
            {/* <HomeSharp className='SidebarIcon'/> */}
            <span className='SidebarListItemText'>Dashboard</span>
          </li>
          <li className='SidebarListItem'>
            {/* <NotificationsNoneSharp className='SidebarIcon'/> */}
            
            <span href="/notification" className='SidebarListItemText'> Gaming Updates</span>
          </li>
          <li className='SidebarListItem'>
            {/* <ForwardToInboxSharp className='SidebarIcon'/> */}
            <span className='SidebarListItemText'>User Management</span>
          </li>
          <li className='SidebarListItem'>
            {/* <PeopleSharp className='SidebarIcon'/> */}
            <span className='SidebarListItemText'>Inbox</span>
          </li><li className='SidebarListItem'>
            {/* <VideoLibrarySharp className='SidebarIcon'/> */}
            <span className='SidebarListItemText'>Notification</span>
          </li><li className='SidebarListItem'>
            {/* <VideoLibrarySharp className='SidebarIcon'/> */}
            <span className='SidebarListItemText'>Reports</span>
          </li>
          
          



        </ul>

      </div>
      </>
    </div>
  )
}

export default AdminSidebar