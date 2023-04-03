import React from "react";
import "./Register.css";

import { useState } from "react";
import { register } from "../api/usersApi/user";
import { useDispatch } from "react-redux";
import { setLogin } from "./state";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const Register = () => {
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    userName: "",
    phoneNumber: "",
  });

  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();

    let res = await register(values);
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
            Sign Up
          </h1>
          <h2 className="text-center mt-2   leading-normal  text-white font-thin text-3xl mb-6">
            Welcome to Gamers DEN
          </h2>
          <form className="display  w-2/3 xl l:w-3/5 " onSubmit={handleSubmit}>
            <div className="flex flex-col mb-4 ">
              {/* <h3 className="loginLogo">Gamers-DEN</h3> */}

              <div className="flex flex-col mb-4 ">
                {/* <input placeholder="Email" className="loginInput" /> */}
                <label
                  className=" text-white font-thin text-2xl mb-6"
                  htmlFor="firstName md:text-left"
                >
                  FirstName:
                </label>
                <input
                  className="text-3xl rounded-3xl loginInput"
                  type="text"
                  id="firstName"
                  value={values.firstName}
                  onChange={(event) =>
                    setValues({
                      ...values,
                      firstName: event.target.value,
                    })
                  }
                  required
                />
                <label
                  className=" text-white font-thin text-2xl mb-6"
                  htmlFor="secondName"
                >
                  LastName:
                </label>
                <input
                  className="text-3xl rounded-3xl loginInput"
                  type="text"
                  id="lastName"
                  value={values.lastName}
                  onChange={(event) =>
                    setValues({
                      ...values,
                      lastName: event.target.value,
                    })
                  }
                  required
                />
                <label
                  className=" text-white font-thin text-2xl mb-6"
                  htmlFor="secondName"
                >
                  userName:
                </label>
                <input
                  className="text-3xl rounded-3xl loginInput"
                  type="text"
                  id="lastName"
                  value={values.userName}
                  onChange={(event) =>
                    setValues({
                      ...values,
                      userName: event.target.value,
                    })
                  }
                  required
                />

                {/* <input placeholder="Email" className="loginInput" /> */}
                <label
                  className=" text-white font-thin text-2xl mb-6"
                  htmlFor="email"
                >
                  Email:
                </label>
                <input
                  className="text-3xl rounded-3xl loginInput"
                  type="email"
                  id="email"
                  value={values.email}
                  onChange={(event) =>
                    setValues({ ...values, email: event.target.value })
                  }
                  required
                />
                {/* <input placeholder="Email" className="loginInput" /> */}
                <label
                  className=" text-white font-thin text-2xl mb-6"
                  htmlFor="email"
                >
                  phone no:
                </label>
                <input
                  className="font-bold text-3xl rounded-3xl  text-center"
                  type="number"
                  id="phoneNumber"
                  value={values.phoneNumber}
                  onChange={(event) =>
                    setValues({ ...values, phoneNumber: event.target.value })
                  }
                  required
                />
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
                  Register
                </button>
                {/* <button className="loginButton">Log In</button> */}
              </div>
            </div>
          </form>
          <div className="pl-56 my-3">
            <span className="text-white w-fit ml-16  p-4 rounded-full">
              Already have account?{" "}
              <span className=" font-semibold text-sky-400 text-xl">
                <Link to="/"> Login Here</Link>
              </span>
            </span>
          </div>
        </div>
        {/* <input placeholder="Username" className="loginInput" />
              <input placeholder="Email" className="loginInput" />
              <input placeholder="Password" className="loginInput" />
               */}
        {/* <button className="loginButton">Sign Up</button> */}
      </div>
    </>
  );
};

export default Register;
