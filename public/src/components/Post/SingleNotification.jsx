import React, { useEffect, useState } from "react";
import "./Post.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { BsCheckAll } from "react-icons/bs";
// import { MoreVert } from '@mui/icons-material'
// import {MoreVert} from '@mui/icons-material';

const SingleNotification = (props) => {
  const { Notifications } = props;
  console.log("Notifications", Notifications);

  const token = useSelector((state) => state.token);
  const user = useSelector((state) => state.user);
  return (
    <>
      {Notifications?.length > 0 ? (
        Notifications.map((notification) => (
          <div className="post" key={notification._id}>
            <div className="postWrapper">
              <div className="postTop">
                <div className="postTopLeft">
                  {/* https://png.pngtree.com/png-clipart/20190516/original/pngtree-purple-samurai-e-sports-logo-for-gaming-mascot-or-twitch-profile-png-image_4278450.jpg */}
                  <img
                    className="postProfileImg"
                    src="https://png.pngtree.com/png-clipart/20190516/original/pngtree-purple-samurai-e-sports-logo-for-gaming-mascot-or-twitch-profile-png-image_4278450.jpg"
                    alt="profilepic"
                  />
                  <div className="notifications">
                    <span>{notification.message}</span>
                    {notification.createdAt}
                  </div>
                  <div>
                    <div className="fixed">
                      {notification.read ? (
                        <div className="absolute text-sky-400 2xl right-1">
                          <BsCheckAll />
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>

                {/* <MoreVert /> */}
              </div>
            </div>
          </div>
        ))
      ) : (
        <div>No new Notifications</div>
      )}
    </>
  );
};

export default SingleNotification;
