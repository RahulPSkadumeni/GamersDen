import React from 'react'
import "./Feed.css"
import Logo2 from './Logo/Logo2'
import Post from './Post/Post'
import Share from './share/Share' 
import {Posts} from "./dummyData"
import Banner from './Banner/Banner'

const SearchFeed = () => {
  const  GametextReact = () => {
    return (
      <div className="game-+text">
        <div className="games">
          <img className="game" src="https://m.media-amazon.com/images/I/512jQQf0loL._SY500_.jpg" />
         
        </div>
        <p className="text-3">Spider-man </p>
      </div>
    )
  }
  const  GametextReact2 = () => {
    return (
      <div className="game-+text">
        <div className="games">
          <img  className="game" src="https://m.media-amazon.com/images/I/815rt+4kDjL._SX569_.jpg" />
         
        </div>
        <p className="text-3">Cyberpunk 2077</p>
      </div>
    )
  }


  const Component4 = () => {
    return (
      <div className="component-4">
        
        <div className="featured-card-2">
          <div className="featured-card-2">
            <img className='Imagegroup' src="https://cdn.cloudflare.steamstatic.com/steam/apps/578080/header.jpg?t=1673331963" />
           
           
            <div className="content">
             <div className='head'>
             <p className="text-2">OpTic Gaming </p> <button className='JoinButton'>Join</button>
              </div>
              <p className="text-3">Always a new challenge. Great place to make new friends.</p>
              <div className="members">
                <div className="frame-1-2-9-0">
                
                  <p className="text-5">28,628 Online  -</p> 
                </div>
                <div className="frame-1-2-9-2">
                 
                  <p className="text-7">527,955 Members</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
    

  
  return (
    <div className='Gfeed'>
      <div className="feedWrapper">
       {/* <Banner/> */}
       

        <h2>Popular right now</h2>
          <div className="GfeedWrapper">
          <GametextReact/>
          <GametextReact2/>
          <GametextReact/>
          <GametextReact2/>
          <GametextReact/>
          <GametextReact2/>
          <GametextReact/>
          <GametextReact2/>
            
          </div>
          <h1 className='FeaturedCommunity'>Featured Community</h1>
          <div className='clsgrp'>
          <Component4/>
          <Component4/>
          <Component4/>
          <Component4/>
          </div>
         
          


{/* 
        {Posts.map((p)=>(
           <Post key={p.id} post={p}/>
        )
         
          
        )}
         */}
       
       

      </div>
    </div>
  )
}

export default SearchFeed