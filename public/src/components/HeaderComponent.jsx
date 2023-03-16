import React from "react";
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

// import {ChatBubbleOutlineSharp} from '@mui/icons-material';
// import {NotificationAddSharp} from "@mui/icons-material"
// import {LogoutSharp} from "@mui/icons-material"
// import {Search} from "@mui/icons-material"
const HeaderComponent = () => {
  const dispatch = useDispatch();
  return (
    <div className="header">
      <div className="topbarleft">
        <Logo />
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          {/* <Search className='searchIcon'/> */}
          <FaSearch className="searchIcon" />
          <input
            type="text"
            placeholder="Search for post,friends, any videos..."
            className="searchInput"
          />
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
            <AiOutlineLogout onClick={dispatch(setLogout())} />
            <span className=""></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderComponent;
