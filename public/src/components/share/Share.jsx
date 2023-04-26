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
import { fetchPost } from "../../api/postApi/post";
import Axios from "../../utils/axios";
// import Button from '@mui/material/Button';
// import {PermMedia,Label,LocationOn,EmojiEmotions, Send} from "@mui/icons-material"
const Share = ({ groupId = false }) => {
  const dispatch = useDispatch();
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
    console.log("groupId>>>>>>>>>>_______>>>>>", groupId);
    const formData = new FormData();
    if (groupId) {
      formData.append("groupId", groupId);
    }
    formData.append("image", file);
    formData.append("des", caption);
    formData.append("userId", userid);
    await Axios.post(" posts/createpostImg", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    const fetchPost = async (userId) => {
      console.log("fetch posts");
      let res = await Axios.get("/posts/profile/" + userId);
      // console.log(res);
      // setPosts(res.data);
      dispatch(
        setPosts({
          posts: res.data,
        })
      );
    };
  };

  return (
    // <>
    //   {" "}
    //   <div className="Share ">
    //     <div className="shareWrapeer">
    //       <div className="shareTop">
    //         <img
    //           className="shareProfileImg"
    //           src="https://helostatus.com/wp-content/uploads/2021/08/profile-pictures-for-WhatsApp.jpg"
    //           alt="profilepic"
    //         />

    //         <form onSubmit={handlePost}>
    //           <div className="grid grid-cols-2   ">
    //             <textarea
    //               className=" flex w-96 flex-col  gap-10 py-6"
    //               value={caption}
    //               onChange={(e) => setCaption(e.target.value)}
    //               type="text"
    //               placeholder="Caption"
    //             ></textarea>
    //             {/* <button type="submit">Submit</button> */}
    //             <div className="items-center   align-middle justify-center">
    //               <button
    //                 type="submit"
    //                 className="items-center ml-4 mt-2  font-semibold align-middle w-4/12 rounded-full px-3 py-3 tracking-wide text-white bg-sky-400 text-xl shadow-2xl border border-slate-100/20 hover:scale-110 transition duration-300 ease-out  hover:shadow-fuchsia-600 active:translate-y-1"
    //               >
    //                 <span className="flex ml-3 mt-1 py-2">
    //                   <IoSendSharp />
    //                   <div className="ml-3">Post</div>
    //                 </span>
    //               </button>
    //             </div>
    //           </div>
    //           <input
    //             className="flex w-96 flex-col  gap-6"
    //             onChange={(e) => setFile(e.target.files[0])}
    //             type="file"
    //             accept="image/*"
    //             placeholder="add Image"
    //           ></input>
    //         </form>
    //       </div>
    //       {/* ????????????????????????????? */}
    //       <div className="flex"></div>
    //       {/* ????????????????????????????? */}
    //     </div>
    //   </div>
    // </>

    // <div className=" Share flex flex-col items-center bg-white rounded-lg shadow-lg p-6">
    //   <div className="flex items-center mb-6">
    //     <img
    //       className="w-12 h-12 rounded-full mr-4"
    //       src="https://helostatus.com/wp-content/uploads/2021/08/profile-pictures-for-WhatsApp.jpg"
    //       alt="profilepic"
    //     />
    //     <form onSubmit={handlePost} className="flex-grow">
    //       <textarea
    //         className="w-full p-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
    //         value={caption}
    //         onChange={(e) => setCaption(e.target.value)}
    //         type="text"
    //         placeholder="Caption"
    //       ></textarea>
    //       <input
    //         className="w-full p-2 my-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    //         onChange={(e) => setFile(e.target.files[0])}
    //         type="file"
    //         accept="image/*"
    //         placeholder="Add image"
    //       ></input>
    //       <button
    //         type="submit"
    //         className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    //       >
    //         <span className="flex items-center">
    //           <IoSendSharp className="mr-2" />
    //           <div>Post</div>
    //         </span>
    //       </button>
    //     </form>
    //   </div>
    //   {/* Extra content */}
    //   <div className="flex justify-center items-center w-full">
    //     {/* Your extra content here */}
    //   </div>
    // </div>
    <div className="Share">
      {/* <div className="shareWrapper max-w-3xl mx-auto bg-white shadow rounded-lg overflow-hidden"> */}
      <div className="grid grid-cols-1 lg:grid-cols-1">
        {" "}
        <div className=" lg:p-4 text-left">
          <img
            className="shareProfileImg w-full h-auto mt-12 object-cover lg:w-auto lg:h-80 lg:rounded-lg"
            src="https://helostatus.com/wp-content/uploads/2021/08/profile-pictures-for-WhatsApp.jpg"
            alt="profilepic"
          />
          <div className="text-gray-100 text-xl "> What's happening? </div>
        </div>
        <div className="p-4">
          <textarea
            className="w-full border-2 border-gray-200 rounded-lg p-4 mb-4"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            type="text"
            placeholder="Caption"
          />
          <input
            className="w-full border-2 border-gray-200 rounded-lg p-4"
            onChange={(e) => setFile(e.target.files[0])}
            type="file"
            accept="image/*"
            placeholder="add Image"
          />
        </div>
        <div className="flex items-center justify-end p-4">
          <button
            type="submit"
            className="inline-flex items-center justify-center px-8 py-5 mr-5 border border-transparent rounded-full shadow-sm text-base font-medium text-white bg-sky-400 hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
            onClick={handlePost}
          >
            <IoSendSharp />
            <span className="ml-2">Post</span>
          </button>
        </div>
      </div>
    </div>
    // </div>
  );
};

export default Share;
