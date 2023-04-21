import React from "react";
import "./Register.css";

import { useState } from "react";
import { changePasssword, register } from "../api/usersApi/user";
import { useDispatch, useSelector } from "react-redux";
import { setLogin } from "./state";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
const NewPassword = () => {
  const dispatch = useDispatch();

  // const user = useSelector((state) => state.user);
  const { ph } = useParams();

  // const userId = user._id;
  const [values, setValues] = useState({
    password: "",
  });

  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();

    let res = await changePasssword(values, ph);
    console.log(res);
    // dispatch(
    //   setLogin({
    //     token: res.token,
    //     user: res.user,
    //   })
    // );

    navigate("/login");
    // TODO: add login logic here
  };
  return (
    <>
      <div className="min-w-min text-center sm:text-left  bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 ...  flex items-center justify-center h-screen">
        <div className="sm:w-1 md:w-1/2"></div>
        <div className="sm: 1 md:w-1/2 min-w-min h-3/4 mr-10 text-center sm:text-left bg-gray-500/50 rounded-3xl border-2 p-8">
          <h1 className="  text-4xl font-medium text-white underline">
            Change Password
          </h1>
          <h2 className="text-center mt-2   leading-normal  text-white font-thin text-3xl mb-6">
            Welcome to Gamers DEN
          </h2>
          <form className="display  w-2/3 xl l:w-3/5 " onSubmit={handleSubmit}>
            <div className="flex flex-col mb-4 ">
              <div className="flex flex-col mb-4 ">
                {/* <input placeholder="Email" className="loginInput" /> */}

                {/* <input placeholder="Password" className="loginInput" /> */}
                <label
                  className=" text-white rounded-3xl font-thin text-2xl mb-6"
                  htmlFor=" password"
                >
                  Password:
                </label>
                <input
                  className="text-3xl rounded-3xl"
                  type="password"
                  id="password"
                  value={values.password}
                  onChange={(event) =>
                    setValues({ ...values, password: event.target.value })
                  }
                  required
                />
                <button
                  className="bg-emerald-500 text-2xl text-white w-fit pr-24 pl-24 mx-auto p-4 my-10 rounded-full"
                  type="submit"
                >
                  Save new Password
                </button>
                {/* <button className="loginButton">Log In</button> */}
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default NewPassword;
