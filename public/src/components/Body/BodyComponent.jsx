import React from 'react'
import Feed from '../Feed'
import Rightbar from '../Rightbar'
import RightbarHome from '../RightbarHome'


// import Rightbar from '../Rightbars'
import Sidebar from '../Sidebar'
import "./BodyComponent.css"


const BodyComponent = () => {
  return (
    <div className='homeContainer'>
       <Sidebar/>
       <Feed/>
     <RightbarHome/>
       </div>
  )
}

export default BodyComponent