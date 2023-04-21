import React, { useState, useEffect } from "react";
import Logo from "./Logo/Logo";
import "./HeaderComponent.css";
import { FaSearch } from "react-icons/fa";
import {
  IoSettingsSharp,
  IoNotificationsSharp,
  IoLogOutSharp,
} from "react-icons/io5";
import { BsChatRight } from "react-icons/bs";
import { AiOutlineLogout } from "react-icons/ai";
import { setLogout } from "../pages/state";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { filterUser } from "../api/filterApi/filterapi";
import { fetchAllUsers } from "../api/usersApi/user";
import FriendsCard from "./friendsCard/FriendsCard";
import { Link, Navigate } from "react-router-dom";
import { fetchAllPost } from "../api/postApi/post";
import { useNavigate } from "react-router-dom";
// import {ChatBubbleOutlineSharp} from '@mui/icons-material';
// import {NotificationAddSharp} from "@mui/icons-material"
// import {LogoutSharp} from "@mui/icons-material"
// import {Search} from "@mui/icons-material"
const HeaderComponent = () => {
  const dispatch = useDispatch();

  const [filteredUser, setFilteredUser] = useState([]);
  const [allUser, setAllUser] = useState([]);
  const [allPost, setAllPost] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const [NotificationCount, setNotificationCount] = useState(null);
  const token = useSelector((state) => state.token);
  const user = useSelector((state) => state.user);
  console.log(user);
  useEffect(() => {
    const fetchNotification = async () => {
      console.log("token", token);
      const data = await axios.post(
        `http://localhost:3001/notification/all`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(data.data.length);
      setNotificationCount(data.data.length);
    };
    fetchNotification();
  }, []);

  // useEffect(() => {
  //   getAllUsers();
  //   //fetchAllUsers();

  //   getAllPost();
  // }, []);

  // const getAllPost = () => {
  //   fetchAllPost().then((result) => {
  //     // setFilteredUser(result);

  //     console.log("allPost>>>>>>>>>", result);
  //     setAllPost(result);
  //   });
  // };

  // const search = async () => {
  //   const { data } = await axios.get("http://localhost:3001/search/searchAll", {
  //     searchTerm: searchTerm,
  //   });
  // };

  const getAllUsers = () => {
    fetchAllUsers().then((result) => {
      // setFilteredUser(result);
      setAllUser(result);
    });
  };
  // const fetchAllUsers = async () => {
  //   const { data } = await axios.get("http://localhost:3001/users/allUsers");
  //   setFilteredUser(data);
  //   setAllUser(data);
  // };
  let allData = allUser.concat(...allPost);
  console.log("allData", allData);

  const handleSearch = async (searchTerm) => {
    if (searchTerm !== "") {
      const { data } = await axios.post(
        "http://localhost:3001/search/searchAll",
        {
          searchTerm: searchTerm,
        }
      );
      console.log(data);
      navigate("/SearchResult", { state: { data } });
      // const data = filterUser(searchTerm, allUser);
      // setFilteredUser(data);
    }
  };
  const clearSearch = () => {
    setFilteredUser(null);
  };

  return (
    // <>
    //   <div className="header sticky ">
    //     <div className="topbarleft">
    //       <Logo />
    //     </div>
    //     <div className="topbarCenter">
    //       <div className="searchbar">
    //         {/* <Search className='searchIcon'/> */}
    //         <FaSearch className="searchIcon" />
    //         <input
    //           type="text"
    //           value={searchTerm}
    //           placeholder="Search for post,friends, any videos..."
    //           className="searchInput"
    //           onChange={(e) => setSearchTerm(e.target.value)}
    //         />
    //         <button
    //           onClick={() => {
    //             handleSearch(searchTerm);
    //           }}
    //         >
    //           Search
    //         </button>
    //         <div className="pt-80 mr-60 pr-10">
    //           {filteredUser?.length > 0 ? (
    //             filteredUser.map((users) => (
    //               <div className=" mt-4 rounded-2xl   bg-white dark:bg-gray-800 p-4">
    //                 <div className="w-700  flex-row gap-4 flex justify-center items-center">
    //                   <div className="flex-shrink-0">
    //                     <Link to={`profile/${users._id}`}>
    //                       <a href="#" className="relative block ">
    //                         <img
    //                           alt=""
    //                           src="https://i.pinimg.com/564x/cf/fc/1d/cffc1d6458cfeae198045145673b351b.jpg"
    //                           className="mx-auto object-cover rounded-full h-16 w-16  mask-"
    //                         />
    //                       </a>
    //                     </Link>
    //                   </div>
    //                   <div className=" flex flex-col ">
    //                     <span className="text-lg font-medium text-gray-600 dark:text-white">
    //                       {users.userName}
    //                       <div></div>
    //                     </span>
    //                     <span className="text-sm text-gray-800">
    //                       {users.firstName} {users.lastName}
    //                     </span>
    //                   </div>
    //                   {/* <button
    //             type="button"
    //             onClick={() => handleFriendRequest(user._id)}
    //             className="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
    //           >
    //             Add Friend
    //           </button> */}
    //                 </div>
    //               </div>
    //             ))
    //           ) : (
    //             <h3 className="text-gray-200"></h3>
    //           )}
    //           {filteredUser?.length > 0 ? (
    //             <button onClick={clearSearch}> X</button>
    //           ) : (
    //             <></>
    //           )}
    //         </div>
    //       </div>
    //     </div>

    //     <div className="topbarRight">
    //       {/*  <ul className='topbarIcon'>
    //             <li><SettingsSharp/></li>
    //             <li>1<ChatBubbleOutlineSharp/></li>
    //             <li>2<NotificationAddSharp/></li>
    //             <li><LogoutSharp/></li>
    //         </ul> */}
    //       <div className="topbarIcons">
    //         <div className="topbarIconItem">
    //           {/* <SettingsSharp /> */} <IoSettingsSharp size={"1.3rem"} />
    //           <span className="topbarIconBadge">1</span>
    //         </div>
    //         <div className="topbarIconItem">
    //           <BsChatRight />
    //           <span className="topbarIconBadge">2</span>
    //         </div>
    //         <div className="topbarIconItem">
    //           <IoNotificationsSharp />
    //           <span className="topbarIconBadge">1</span>
    //         </div>
    //         <div className="topbarIconItem">
    //           <AiOutlineLogout onClick={() => dispatch(setLogout())} />
    //           <span className=""></span>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </>

    <>
      <div className="header sticky bg-white dark:bg-gray-800 shadow-md py-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="w-1/5">
            <Logo />
          </div>
          <div className="topbarCenter flex-grow">
            <div className="searchbar relative">
              <FaSearch className="searchIcon absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300" />
              <input
                type="text"
                value={searchTerm}
                placeholder="   Search for post, friends, any videos..."
                className="searchInput pl-10 pr-4 py-1 w-full text-md rounded-md border border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                onClick={() => {
                  handleSearch(searchTerm);
                }}
                className="bg-indigo-600 text-white px-4 py-1 rounded-md ml-2 focus:outline-none hover:bg-indigo-700 absolute right-0"
              >
                Search
              </button>
              <div className="pt-80 mr-60 pr-10">
                {/* Add your search results display here */}
              </div>
            </div>
          </div>
          <div className="topbarRight flex items-center">
            <div className="topbarIcons">
              <div className="topbarIconItem relative mr-3">
                <IoSettingsSharp size={"1.3rem"} className="text-gray-600" />
                <span className="topbarIconBadge absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  1
                </span>
              </div>
              <div className="topbarIconItem relative mr-3">
                <BsChatRight className="text-gray-600" />
                <span className="topbarIconBadge absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  2
                </span>
              </div>
              <div className="topbarIconItem relative mr-3">
                <IoNotificationsSharp className="text-gray-600" />
                <span className="topbarIconBadge absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {NotificationCount}
                </span>
              </div>
              <div className="topbarIconItem">
                <AiOutlineLogout
                  onClick={() => dispatch(setLogout())}
                  className="text-gray-100"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderComponent;
