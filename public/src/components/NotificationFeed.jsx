import React from 'react'
import "./Feed.css"
import Logo2 from './Logo/Logo2'
import Post from './Post/Post'
import Share from './share/Share' 
import {Posts} from "./dummyData"
import Banner from './Banner/Banner'
import SingleNotification from './Post/SingleNotification'

const NotificationFeed = () => {
  return (
    <div className='feed'>
      <div className="feedWrapper">
      
       
        {/* {Posts.map((p)=>(
           <Post key={p.id} post={p}/>
        )
         
          
        )} */}
        
       
       <SingleNotification/>

      </div>
    </div>
  )
}

export default NotificationFeed