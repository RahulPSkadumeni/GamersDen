import React from 'react'
import "./Feed.css"
import Logo2 from './Logo/Logo2'
import Post from './Post/Post'
import Share from './share/Share' 
import {Posts} from "./dummyData"
import Banner from './Banner/Banner'

const GroupFeed = () => {
  return (
    <div className='feed'>
      <div className="feedWrapper">
       <Banner/>
        <Share/>
        {Posts.map((p)=>(
           <Post key={p.id} post={p}/>
        )
         
          
        )}
        
       
       

      </div>
    </div>
  )
}

export default GroupFeed