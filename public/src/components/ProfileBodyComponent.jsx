import React from 'react'
import Feed from './Feed'
import Rightbar from './Rightbar'
import Sidebar from './Sidebar'
import UserProfile from './UserProfile/UserProfile'
import "./profileBodyComponent.css" 

const ProfileBodyComponent = () => {
  return (
    <div className='profilepage'>
        <Sidebar/>
        
        <UserProfile/>
    
       

        
    </div>
  )
}

export default ProfileBodyComponent