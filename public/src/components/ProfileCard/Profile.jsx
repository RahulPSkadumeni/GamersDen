import React from 'react';
import { Link } from 'react-router-dom';
import "./Profile.css"

const Profile = () => {
  return ( 
    
    <div  className='profilecard'> 
      
    <div className="card-container">
   
	<div className='image-container' >
    <img  className="round" src="https://i.pinimg.com/564x/cf/fc/1d/cffc1d6458cfeae198045145673b351b.jpg" alt="user" />
    </div>
	
	<h3 href="#"  >Rahul P S</h3>
 
	<h6>@Rahulps</h6>
	<p>“Gamer zone, be careful.” <br/> “Do more of what makes you happy.”</p>
	<div>
		
	</div>
	
</div>

        
    </div>
  )
}

export default Profile