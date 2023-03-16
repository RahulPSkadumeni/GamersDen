import React from 'react'
import "./Post.css"
// import { MoreVert } from '@mui/icons-material'
// import {MoreVert} from '@mui/icons-material';

const SingleNotification = () => {
  console.log();
  return (
    <>
    
    <div className='post'>
        <div className='postWrapper'>
            <div className='postTop'>
                <div className="postTopLeft">
                
                {/* https://png.pngtree.com/png-clipart/20190516/original/pngtree-purple-samurai-e-sports-logo-for-gaming-mascot-or-twitch-profile-png-image_4278450.jpg */}
                    <img className="postProfileImg" src="https://png.pngtree.com/png-clipart/20190516/original/pngtree-purple-samurai-e-sports-logo-for-gaming-mascot-or-twitch-profile-png-image_4278450.jpg" alt="profilepic" />
                   <div className="notifications">
                    <span >
                  
                  Akhil Added a new photo

                  </span>
                  <div className='time'>
                  16:01:2023 
                 </div>
                 </div>
                
                 </div>
                
              {/* <MoreVert /> */}
                 
            </div>

        </div>
        
    </div>

    
    <div className='post'>
        <div className='postWrapper'>
            <div className='postTop'>
                <div className="postTopLeft">
                
                {/* https://png.pngtree.com/png-clipart/20190516/original/pngtree-purple-samurai-e-sports-logo-for-gaming-mascot-or-twitch-profile-png-image_4278450.jpg */}
                    <img className="postProfileImg" src="https://png.pngtree.com/png-clipart/20190516/original/pngtree-purple-samurai-e-sports-logo-for-gaming-mascot-or-twitch-profile-png-image_4278450.jpg" alt="profilepic" />
                   <div className="notifications">
                    <span >
                  
                    A group you follows AK GamerX changed its name to Squad of Gamers

                  </span>
                  <div className='time'>
                  16:01:2023 
                 </div>
                 </div>
                
                 </div>
                
              {/* <MoreVert /> */}
                 
            </div>

        </div>
        
    </div>


    <div className='post'>
        <div className='postWrapper'>
            <div className='postTop'>
                <div className="postTopLeft">
                
                {/* https://png.pngtree.com/png-clipart/20190516/original/pngtree-purple-samurai-e-sports-logo-for-gaming-mascot-or-twitch-profile-png-image_4278450.jpg */}
                    <img className="postProfileImg" src="https://png.pngtree.com/png-clipart/20190516/original/pngtree-purple-samurai-e-sports-logo-for-gaming-mascot-or-twitch-profile-png-image_4278450.jpg" alt="profilepic" />
                   <div className="notifications">
                    <span >
                  
                    Amal send you  a Friend Request 

                  </span>
                  <div className='time'>
                  16:01:2023 
                 </div>
                 </div>
                
                 </div>
                
              {/* <MoreVert /> */}
                 
            </div>

        </div>
        
    </div>


   
    </>
  )
}

export default SingleNotification