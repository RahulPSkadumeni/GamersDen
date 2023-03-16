import React from 'react'
import "./FriendsCard.css"

const FriendsCard = () => {
  return (
    <div>
         <ul className="rightbarFriendList">
          
        
        
          <li className="rigthBarFriend">
            <div className="rightBarProfileImageContainer">
              <img  className='rightbarprofileImage' src="/images/person/1.jpeg" alt="" />
              <span className='rigbtbarOnline'></span>
              
            </div>
            <div className='rigthBarFriendCardData'>
  
            <span className='rigbtbarUsername'> Yadhu Yadhu</span>
  
            <span className='lastSeen' >45 min ago</span> 
            </div>
          </li>
  
          
          <li className="rigthBarFriend">
            <div className="rightBarProfileImageContainer">
              <img  className='rightbarprofileImage' src="https://wallpapers.com/images/featured-full/cool-profile-pictures-4co57dtwk64fb7lv.jpg" alt="" />
              <span className='rigbtbarOnline'></span>
              
            </div>
            <div className='rigthBarFriendCardData'>
  
            <span className='rigbtbarUsername'> Yadhu Yadhu</span>
  
            <span className='lastSeen' >45 min ago</span>
            </div>
          </li>
  
  
  
          <li className="rigthBarFriend">
            <div className="rightBarProfileImageContainer">
              <img  className='rightbarprofileImage' src="https://wallpapers.com/images/featured-full/cool-profile-pictures-4co57dtwk64fb7lv.jpg" alt="" />
              <span className='rigbtbarOnline'></span>
              
            </div>
            <div className='rigthBarFriendCardData'>
  
            <span className='rigbtbarUsername'> Yadhu Yadhu</span>
  
            <span className='lastSeen' >45 min ago</span>
            </div>
          </li>
  
          </ul>
          
    </div>
  )
}

export default FriendsCard 