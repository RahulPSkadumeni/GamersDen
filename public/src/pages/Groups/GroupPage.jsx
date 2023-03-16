import React from 'react'
import Feed from '../../components/Feed'
import GroupFeed from '../../components/GroupFeed'
import HeaderComponent from '../../components/HeaderComponent'
import ProfileComponent from '../../components/ProfileComponent'
import Rightbar from '../../components/Rightbar'

import Sidebar from '../../components/Sidebar'
import GroupRightbar from './GroupRightbar'



import "./Profilepage.css"
const GroupPage = () => {
  return (
    <div>
    
      <HeaderComponent/> 
      <div className='profile'> 
      <Sidebar/>

      {/* <ProfileComponent/> */}
      <div className='profileRight'>
        <div className="profileRightTop">
          <div className="profileCover">
            
          {/* <img  className="profileCoverImage" src="../../assets/post/3.jpeg" alt="coverImg" /> */}
          <img  className="profileCoverImage" src="https://www.fbcoverlover.com/covers/mortal-kombat-2-Facebook-Cover.jpg?i" alt="coverImg" />
          {/* <img  className="profileUserImage" src="../../assets/person/7.jpeg" alt="profileAvatar" /> */}
          <img  className="profileUserImage" src="https://i.pinimg.com/564x/0f/e6/11/0fe611de8b4a8747c317715e4e77ec0d.jpg" alt="profileAvatar" />
        
         </div>
         <div className="profileInfo">

         <h3>OpTic Gaming</h3>
	<h6></h6> 
  <div className='status'>
	<p >Always a new challenge. Great place to make new friends.</p></div>

         </div>
          </div>
        <div className="profileRightBottom">
      <GroupFeed/>
      <GroupRightbar/>
        </div>

       </div>
       </div>
      
     
  
      

    </div>
  )
}

export default GroupPage