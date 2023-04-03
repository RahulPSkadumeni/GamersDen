import React from "react";
import "./share.css";
import { IoSendSharp } from "react-icons/io5";
import { GrAttachment } from "react-icons/gr";
import Dropzone from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { setPosts } from "../../pages/state";
import axios from "axios";
import AiFillEdit from "react-icons/ai";
import Test from "../../pages/testpage/Test";
// import Button from '@mui/material/Button';
// import {PermMedia,Label,LocationOn,EmojiEmotions, Send} from "@mui/icons-material"
const Share = () => {
  const dispatch = useDispatch;
  const [isImage, setIsImage] = useState(false); //act as a switch weather someone clicked to open dropzone
  const [image, setImage] = useState(null);
  const [post, setPost] = useState("");
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const [file, setFile] = useState();
  const [caption, setCaption] = useState("");
  const userid = user._id;

  const handlePost = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("image", file);
    formData.append("des", caption);
    formData.append("userId", userid);
    await axios.post(" http://localhost:3001/posts/createpostImg", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  };

  return (
    <div className="Share ">
      <div className="shareWrapeer">
        <div className="shareTop">
          <img
            className="shareProfileImg"
            src="https://helostatus.com/wp-content/uploads/2021/08/profile-pictures-for-WhatsApp.jpg"
            alt="profilepic"
          />

          <form onSubmit={handlePost}>
            <div className="grid grid-cols-2   ">
              <textarea
                className=" flex w-96 flex-col  gap-10 py-6"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                type="text"
                placeholder="Caption"
              ></textarea>
              {/* <button type="submit">Submit</button> */}
              <div className="items-center   align-middle justify-center">
                <button
                  type="submit"
                  className="items-center ml-4  font-semibold align-middle w-4/12 rounded-full px-3 py-4  tracking-wide text-white bg-sky-400 text-xl shadow-2xl border border-slate-100/20 hover:scale-110 transition duration-300 ease-out  hover:shadow-fuchsia-600 active:translate-y-1"
                >
                  <span className="flex ml-3 py-2">
                    <IoSendSharp />
                    <div className="ml-3">Post</div>
                  </span>
                </button>
              </div>
            </div>
            <input
              className="flex w-96 flex-col  gap-6"
              onChange={(e) => setFile(e.target.files[0])}
              type="file"
              accept="image/*"
              placeholder="add Image"
            ></input>
          </form>
        </div>
        {/* ????????????????????????????? */}
        <div className="flex"></div>
        {/* ????????????????????????????? */}
        <hr className="shareHr" />
        <div className="shareBottom">
          <div className="shareOptions">
            <div>
              <h4>
                {/* {isImage && <div className="h-8"></div>}
                <GrAttachment /> */}
              </h4>

              {/* <PermMedia htmlColor="tomato" className="shareIcon"/> */}
              {/* <span className="shareOptionText">Photo or Video</span> */}
            </div>
            <div>
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

export default Share;
