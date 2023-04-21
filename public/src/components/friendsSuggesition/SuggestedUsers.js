import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSuggestedUser } from "../../api/usersApi/user";
import { friendRequest } from "../../api/usersApi/user";
import { Link } from "react-router-dom";
import axios from "axios";
const SuggestedUsers = () => {
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const userId = user._id;
  const currentUserId = user._id;
  console.log(">>token>>>>>>>>>", token);
  useEffect(() => {
    suggestedUsersSearch();
  }, [user]);

  const suggestedUsersSearch = () => {
    fetchSuggestedUser(userId, token).then((result) => {
      console.log(">>>>>>", result);
      setSuggestedUsers(result);
    });
  };

  const handleFriendRequest = async (id) => {
    console.log(id);
    console.log(currentUserId);
    console.log("llllllllllllllllllllllllllllllllllllllllllll");
    console.log("token>>>>>>>>", token, "token");
    friendRequest(id, currentUserId, token);
    //notification
    console.log("first notification");
    const Notification = await axios.post(
      `http://localhost:3001/notification/${id}`,
      null,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("first");
    let suggested = suggestedUsers.filter((user) => user._id !== id);
    setSuggestedUsers(suggested);
    // setFilteredUser(data);
  };

  return (
    <>
      {/* <div className="card card-side bg-base-100 shadow-xl">
        <figure>
          <img
            src="https://wallpapers.com/images/featured-full/cool-profile-pictures-4co57dtwk64fb7lv.jpg"
            alt="Movie"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">New movie is released!</h2>
          <p>Click the button to watch on Jetflix app.</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Watch</button>
          </div>
        </div>
      </div> */}

      {suggestedUsers?.length > 0 ? (
        suggestedUsers.map((userSuggestion) => (
          <div className="shadow-lg  mt-4 rounded-2xl w-4/5 bg-white dark:bg-gray-800 p-4">
            <div className="flex-row gap-4 flex justify-center items-center">
              <div className="flex-shrink-0">
                <Link to={`profile/${userSuggestion._id}`}>
                  <a href="#" className="relative block ">
                    <img
                      alt=""
                      src="https://i.pinimg.com/564x/cf/fc/1d/cffc1d6458cfeae198045145673b351b.jpg"
                      className="mx-auto object-cover rounded-full h-16 w-16  mask-"
                    />
                  </a>
                </Link>
              </div>
              <div className=" flex flex-col ">
                <span className="text-lg font-medium text-gray-600 dark:text-white">
                  {userSuggestion.userName}
                  <div></div>
                </span>
                <span className="text-sm text-gray-800">
                  {userSuggestion.firstName} {userSuggestion.lastName}
                </span>
                {/* <span className="text-xs text-gray-400">
                  {userSuggestion?.desc
                    ? userSuggestion.desc
                    : "Live is full of adventure"}
                </span> */}
                {/* <span className="text-s text-gray-400">
                  {userSuggestion?.occupation
                    ? userSuggestion.occupation
                    : "occupation:Gaming"}
                </span> */}
              </div>
              <button
                type="button"
                onClick={() => handleFriendRequest(userSuggestion._id)}
                className="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
              >
                Follow
              </button>
            </div>
          </div>
        ))
      ) : (
        <h5 className="text-gray-200">you have no suggested user</h5>
      )}
    </>
  );
};
export default SuggestedUsers;

// <div className="shadow-lg rounded-2xl w-4/5 bg-white dark:bg-gray-800 p-4">
//           <div className="flex-row gap-4 flex justify-center items-center">
//             <div className="flex-shrink-0">
//               <a href="#" className="relative block ">
//                 <img
//                   alt=""
//                   src="https://i.pinimg.com/564x/cf/fc/1d/cffc1d6458cfeae198045145673b351b.jpg"
//                   className="mx-auto object-cover rounded-full h-16 w-16 "
//                 />
//               </a>
//             </div>
//             <div className=" flex flex-col w-5/6">
//               <span className="text-lg font-medium text-gray-600 dark:text-white">
//                 {user.userName}?<div>{suggestedUsers}</div>
//               </span>
//               <span className="text-xs text-gray-400">
//                 {user?.desc ? user.desc : "Live is full of adventure"}
//               </span>
//             </div>
//             <button
//               type="button"
//               className="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
//             >
//               Add Friend
//             </button>
//           </div>
//         </div>
