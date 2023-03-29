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

  const handlePost = async (e) => {
    e.preventDefault();
    console.log(">>>>>>>>>>>", userid);
    const formData = new FormData();

    formData.append("userId", user._id);
    console.log(formData);
    formData.append("des", caption);

    console.log(formData.keys());
    // for (const key of formData.keys()) {
    //   console.log(key);
    // }
    // for (const value of formData.values()) {
    //   console.log(value);
    // }
    // console.log("TYPE", typeof formData);
    if (file) {
      formData.append("image", file);
      // formData.append("picturePath", file.name);
    }

    // const response = await fetch(`http://localhost:3001/posts/createpost`, {
    //   method: "POST",

    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${token}`,
    //   },
    //   // body: JSON.stringify{ data: formData },
    //   body: JSON.stringify({
    //     userId: formData.get("userId"),
    //     des: formData.get("des"),
    //   }),
    // });

    // const response = await axios.post(
    //   `http://localhost:3001/posts/createpost`,
    //   { data: { form: formData }, withCredentials: true }
    // );
    // const posts = await response.json();
    // console.log(posts);
    // dispatch(setPosts({ posts }));
    // setImage(null);
    // setPost(""); //reset after making api call

    //   await axios.post("http://localhost:3001/createpost", formData, {
    //     headers: { "Content-Type": "multipart/form-data" },
    //   });
    // };

    // await axios.post("http://localhost:3001/posts/createpost", formData, {
    //   headers: { "Content-Type": "multipart/form-data" },
    // });
  };

  const submit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("image", file);
    formData.append("caption", caption);
    await axios.post("http://localhost:3001/createPosts", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  };

  return (
    <div className="Share">
      <div className="shareWrapeer">
        <div className="shareTop">
          <img
            className="shareProfileImg"
            src="https://helostatus.com/wp-content/uploads/2021/08/profile-pictures-for-WhatsApp.jpg"
            alt="profilepic"
          />
          {/* <form className="w-10/12 ">
            <div>
              <input
                placeholder="Create New Post"
                onChange={(e) => setPost(e.target.value)}
                value={post}
                name="des"
                className=" ShareInput"
              />
              <div> */}
          {/* <Dropzone
                  acceptedFiles=".jpg,.jpeg,.png"
                  multiple={false}
                  onDrop={(acceptedFiles) =>
                    setFieldValue("image", acceptedFiles[0])
                  }
                >
                  {({ getRootProps, getInputProps }) => (
                    <section>
                      <div {...getRootProps()} />
                      {!values.picture?( <p>
                        Drag 'n' drop some files here, or click to select files
                      </p>):} 
                      
                      <input {...getInputProps()} />
                     
                    </section>
                  )}
                </Dropzone> */}
          {/* <Dropzone
                  acceptedFiles=".jpg,.jpeg,.png"
                  multiple={false}
                  onDrop={(acceptedFiles) =>
                    setFieldValue("picture", acceptedFiles[0])
                  }
                >
                  {({ getRootProps, getInputProps }) => (
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      {!values.picture ? (
                        <p>Add Picture Here</p>
                      ) : (
                        <div>
                          <div>{values.picture.name}</div>
                          <AiFillEdit />
                        </div>
                      )}
                    </div>
                  )}
                </Dropzone> */}
          {/* </div>
              <h3 className=" w-1/4 pl-3 text-white">
                <button
                  type="submit"
                  className=" w-1/4 pl-3 text-white"
                  disabled={!post}
                  onClick={handlePost}
                >
                  <IoSendSharp />
                </button>
              </h3>
            </div>
          </form> */}

          {/* <form onSubmit={handlePost}>
            <input
              onChange={(e) => setFile(e.target.files[0])}
              type="file"
              accept="image/*"
              placeholder="add Image"
            ></input>
            <input
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              type="text"
              placeholder="Caption"
            ></input>
            <button type="submit">Submit</button>
          </form> */}

          <form onSubmit={submit}>
            <input
              onChange={(e) => setFile(e.target.files[0])}
              type="file"
              accept="image/*"
            ></input>
            <input
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              type="text"
              placeholder="Caption"
            ></input>
            <button type="submit">Submit</button>
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
