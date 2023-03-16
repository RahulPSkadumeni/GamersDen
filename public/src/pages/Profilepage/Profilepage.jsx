import React from 'react'
import Feed from '../../components/Feed'
import HeaderComponent from '../../components/HeaderComponent'
import ProfileComponent from '../../components/ProfileComponent'
import Rightbar from '../../components/Rightbar'

import Sidebar from '../../components/Sidebar'



import "./Profilepage.css"
const Profilepage = () => {
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
          <img  className="profileCoverImage" src="https://www.fbcoverlover.com/covers/game4.jpg?i" alt="coverImg" />
          {/* <img  className="profileUserImage" src="../../assets/person/7.jpeg" alt="profileAvatar" /> */}
          <img  className="profileUserImage" src="https://i.pinimg.com/564x/cf/fc/1d/cffc1d6458cfeae198045145673b351b.jpg" alt="profileAvatar" />
        
         </div>
         <div className="profileInfo">

         <h3>Rahul P S</h3>
	<h6>@Rahulps</h6>
  <div className='status'>
	<p >“Gamer zone, be careful.” <br/> “Do more of what makes you happy.”</p></div>

         </div>
          </div>
        <div className="profileRightBottom">
      <Feed/>
      <Rightbar profile />
        </div>

       </div>
       </div>
      
     
  
      

    </div>
  )
}

export default Profilepage