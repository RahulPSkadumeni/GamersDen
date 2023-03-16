import React from 'react'
import FriendsCard from './friendsCard/FriendsCard'
import FriendsList from './friendslist/FriendsList'
import FriendsRequestCard from './friendsRequestCard/FriendsRequestCard'
import Profile from './ProfileCard/Profile'
import "./Rightbar.css"




export default function RightbarGroup({profile}) {



  const ProfileRightBar=()=>{
    return(
  
      // "rigthBarFriend"> 
      //   <div className="rightbar"></div>
  
      <div>
         <Profile/>
      <h1 className='RIghtbarTitle'>Group Information Title   </h1>
      <div className='Rightbarinfo'>
        <div className="rightbarInfoItem">
          {/* <span className="rightbarInfokey">City:</span>
          <span className="rightbarInfoValue">Ernakulam:</span>
            
            </div>
  
            <div className="rightbarInfoItem">
          <span className="rightbarInfokey">From:</span>
          <span className="rightbarInfoValue">Kannur</span>
            
            </div>
  
            <div className="rightbarInfoItem">
          <span className="rightbarInfokey">Relationship:</span>
          <span className="rightbarInfoValue">Single</span> */}
          </div> 
            </div>
  
          <h4>User Members</h4>
          <FriendsList/>
          {/* <FriendsCard/> */}
            
  
      </div>
    )
   }

  return (

    <div div className='rightbar'>
    <ProfileRightBar/>
    </div>
  )
}

