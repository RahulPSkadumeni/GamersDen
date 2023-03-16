import React from 'react'
import FriendsCard from './friendsCard/FriendsCard'
import FriendsList from './friendslist/FriendsList'
import FriendsRequestCard from './friendsRequestCard/FriendsRequestCard'
import Profile from './ProfileCard/Profile'
import "./Rightbar.css"

const HomeRightBar=()=>{

  return(
    <>
     <Profile/>
       <h4 className="rightbarTitle">Online Friends</h4>

        
       
<FriendsCard className="rightbarFriendList" />

<h4 className="rightbarTitle"> Friends Request</h4>

<FriendsRequestCard className="rightbarFriendList" />
    </>
  )
}
 const ProfileRightBar=()=>{
  return(

    // "rigthBarFriend"> 
    //   <div className="rightbar"></div>

    <div>
       <Profile/>
    <h1 className='RIghtbarTitle'>User Information Title   </h1>
    <div className='Rightbarinfo'>
      <div className="rightbarInfoItem">
        <span className="rightbarInfokey">City:</span>
        <span className="rightbarInfoValue">Ernakulam:</span>
          
          </div>

          <div className="rightbarInfoItem">
        <span className="rightbarInfokey">From:</span>
        <span className="rightbarInfoValue">Kannur</span>
          
          </div>

          <div className="rightbarInfoItem">
        <span className="rightbarInfokey">Relationship:</span>
        <span className="rightbarInfoValue">Single</span>
        </div> 
          </div>

        <h4>User Friends</h4>
        <FriendsList/>
        {/* <FriendsCard/> */}
          

    </div>
  )
 }

const Rightbarr = () => {
  return (
    <div className='rightbar'>
        {/* <div className="birthdayContainer">
        <img className="birthdayImg" src="../../assets/gift.png" alt="" />
          <span className="birthdayText">
          <b>Amal </b> and <b>3 other friends</b> have a birhday today. </span>

         
          
        </div> */}


       
        <ProfileRightBar/>
        {/* <HomeRightBar/> */}
      
        {/* <h4 className="rightbarTitle">Online Friends</h4>

        
        
        <FriendsCard className="rightbarFriendList" />

        <h4 className="rightbarTitle"> Friends Request</h4>

        <FriendsRequestCard className="rightbarFriendList" /> */}
       </div>

  )
}

export default Rightbarr


// export default function haahahahha() {
//   return (
//     <div>haahahahha</div>
//   )
// }
