import React from "react";
import { Link, useLocation } from "react-router-dom";
import Post from "./Post/Post";
import HeaderComponent from "./HeaderComponent";
import Sidebar from "./Sidebar";
import RightbarHome from "./RightbarHome";

function SearchResult() {
  const location = useLocation();
  const data = location.state.data;

  return (
    <div className="bg-gradient-to-br from-purple-500 via-pink-500 to-indigo-500  dark:bg-gray-800 min-h-screen">
      <HeaderComponent />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-3 fixed top-0 left-0 h-full mb-5">
            <Sidebar className="fixed" />
          </div>

          <div className="col-span-6">
            <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">
              Search Results
            </h1>
            {data.posts?.map((post) => (
              <Post className="max-w-44 mb-4" key={post._id} post={post} />
            ))}
            {data.users.map((user) => (
              <div
                className="mt-4 rounded-lg bg-white dark:bg-gray-700 p-4"
                key={user._id}
              >
                <div className="flex gap-4 items-center">
                  <Link to={`/profile/${user._id}`}>
                    <a href="#" className="relative block">
                      <img
                        alt=""
                        src="https://i.pinimg.com/564x/cf/fc/1d/cffc1d6458cfeae198045145673b351b.jpg"
                        className="rounded-full h-16 w-16 object-cover"
                      />
                    </a>
                  </Link>
                  <div className="flex flex-col">
                    <span className="text-lg font-medium text-gray-800 dark:text-white">
                      {user.userName}
                    </span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {user.firstName} {user.lastName}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="col-span-3 fixed top-0 right-0 h-full">
            <RightbarHome />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchResult;
