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
import { useDispatch } from "react-redux";
import axios from "axios";
import { filterUser } from "../api/filterApi/filterapi";
import { fetchAllUsers } from "../api/usersApi/user";

// import {ChatBubbleOutlineSharp} from '@mui/icons-material';
// import {NotificationAddSharp} from "@mui/icons-material"
// import {LogoutSharp} from "@mui/icons-material"
// import {Search} from "@mui/icons-material"
const HeaderComponent = () => {
  const dispatch = useDispatch();

  const [filteredUser, setFilteredUser] = useState([]);
  const [allUser, setAllUser] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getAllUsers();
    //fetchAllUsers();
  }, []);

  const getAllUsers = () => {
    fetchAllUsers().then((result) => {
      setFilteredUser(result);
      setAllUser(result);
    });
  };
  // const fetchAllUsers = async () => {
  //   const { data } = await axios.get("http://localhost:3001/users/allUsers");
  //   setFilteredUser(data);
  //   setAllUser(data);
  // };

  const handleSearch = (searchTerm, allUser) => {
    if (searchTerm !== "") {
      const data = filterUser(searchTerm, allUser);
      setFilteredUser(data);
    }
  };

  return (
    <>
      <div className="header sticky ">
        <div className="topbarleft">
          <Logo />
        </div>
        <div className="topbarCenter">
          <div className="searchbar">
            {/* <Search className='searchIcon'/> */}
            <FaSearch className="searchIcon" />
            <input
              type="text"
              value={searchTerm}
              placeholder="Search for post,friends, any videos..."
              className="searchInput"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              onClick={() => {
                handleSearch(searchTerm, allUser);
              }}
            >
              Search
            </button>
          </div>
        </div>

        <div className="topbarRight">
          {/*  <ul className='topbarIcon'>
                <li><SettingsSharp/></li>
                <li>1<ChatBubbleOutlineSharp/></li>
                <li>2<NotificationAddSharp/></li>
                <li><LogoutSharp/></li>
            </ul> */}
          <div className="topbarIcons">
            <div className="topbarIconItem">
              {/* <SettingsSharp /> */} <IoSettingsSharp size={"1.3rem"} />
              <span className="topbarIconBadge">1</span>
            </div>
            <div className="topbarIconItem">
              <BsChatRight />
              <span className="topbarIconBadge">2</span>
            </div>
            <div className="topbarIconItem">
              <IoNotificationsSharp />
              <span className="topbarIconBadge">1</span>
            </div>
            <div className="topbarIconItem">
              <AiOutlineLogout onClick={() => dispatch(setLogout())} />
              <span className=""></span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderComponent;
