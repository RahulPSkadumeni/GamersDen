import React from "react";
import "./share.css";
import { IoSendSharp } from "react-icons/io5";
import { GrAttachment } from "react-icons/gr";
// import Button from '@mui/material/Button';
// import {PermMedia,Label,LocationOn,EmojiEmotions, Send} from "@mui/icons-material"
const share = () => {
  return (
    <div className="Share">
      <div className="shareWrapeer">
        <div className="shareTop">
          <img
            className="shareProfileImg"
            src="https://helostatus.com/wp-content/uploads/2021/08/profile-pictures-for-WhatsApp.jpg"
            alt="profilepic"
          />
          <input placeholder="Create New Post" className="ShareInput" />{" "}
          <h3 className="pl-3 text-white">
            <IoSendSharp />
          </h3>
        </div>

        <hr className="shareHr" />
        <div className="shareBottom">
          <div className="shareOptions">
            <div className="">
              <h4 className>
                <GrAttachment />
              </h4>
              {/* <PermMedia htmlColor="tomato" className="shareIcon"/> */}
              {/* <span className="shareOptionText">Photo or Video</span> */}
            </div>
            <div className>
              {/* <Label htmlColor="blue" className="shareIcon"/> */}
              {/* <span className="shareOptionText">Tag</span> */}
            </div>
            <div className="shareOption">
              {/* <LocationOn htmlColor="green" className="shareIcon"/> */}
              {/* <span className="shareOptionText">Location</span> */}
            </div>
            <div className="shareOption">
              {/* <EmojiEmotions htmlColor="goldenrod" className="shareIcon"/> */}
              {/* <span className="shareOptionText">Feelings</span> */}
            </div>
          </div>
          {/* <button endIcon={<Send/>} >Share</button> */}
          {/* <Button variant="contained"  color="success" className="shareButton"endIcon={<Send/>}>
  Share
</Button> */}
        </div>
      </div>
    </div>
  );
};

export default share;
