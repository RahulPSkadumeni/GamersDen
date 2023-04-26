import React from "react";

import "./login.css";

// const Login = () => {
//   const theme = useTheme();
//   const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
//   return (
//     <Box>
//       <Box width="100%" p="1rem 6%" textAlign="center">
//         <Typography fontWeight="bold" fontSize="32px" color="primary">
//           Gamers-DEN{" "}
//         </Typography>
//       </Box>
//       <Box
//         width={isNonMobileScreens ? "50%" : "93%"}
//         p="2rem"
//         m="2rem auto"
//         borderRadius="1.5rem"
//         backgroundColor={theme.palette.background.alt}
//       ></Box>
//       <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
//         Welcome to Gamers DEN
//       </Typography>

//       <Form />

//       {/* <div>login</div>
//       <div className="login">
//         <div className="loginWrapper">
//           <div className="loginLeft">
//             <h3 className="loginLogo">Gamers-DEN</h3>
//             <span className="loginDesc"></span>
//           </div>
//           <div className="loginRight">
//             <div className="loginBox">
//               <input placeholder="Email" className="loginInput" />

//               <input placeholder="Password" className="loginInput" />
//               <button className="loginButton">Log In</button>
//               <span className="loginForgot">Forgot Password?</span>
//               <button className="loginRegisterButton">
//                 Create a New Account
//               </button>
//             </div>
//           </div>
//         </div>
//       </div> */}
//     </Box>
//   );
// };
import { useState } from "react";
import { login } from "../api/usersApi/user";
import { useDispatch } from "react-redux";
import { setLogin } from "./state";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Submitted:", email, password);
    let res = await login(email, password);
    console.log(res);
    if (res.msg) {
      setErr(res.msg);
    } else {
      dispatch(
        setLogin({
          token: res.token,
          user: res.user,
        })
      );
      navigate("/");
    }

    // TODO: add login logic here
  };

  return (
    // <>
    //   <div className="min-w-min text-center sm:text-left  bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 ...  flex items-center justify-center h-screen">
    //     <div className="sm:w-1 md:w-1/2"></div>
    //     <div className="sm: 1 md:w-1/2 min-w-min h-3/4 mr-10 text-center sm:text-left bg-gray-500/50 rounded-3xl border-2 p-8">
    //       <h1 className="  text-4xl font-medium text-white underline ">
    //         Login
    //       </h1>
    //       <h1 className="text-center leading-normal text-white font-medium text-3xl mb-6">
    //         Welcome to Gamers-DEN
    //       </h1>
    //       <form className="display  w-2/3 xl l:w-3/5 " onSubmit={handleSubmit}>
    //         <div>{err}</div>
    //         <div className="flex flex-col mb-4">
    //           {/* <input placeholder="Email" className="loginInput" /> */}
    //           <label
    //             className=" text-white font-thin text-2xl mb-6"
    //             htmlFor="email"
    //           >
    //             Email:
    //           </label>
    //           <input
    //             className="text-3xl rounded-3xl "
    //             type="email"
    //             id="email"
    //             value={email}
    //             onChange={(event) => setEmail(event.target.value)}
    //             required
    //           />
    //           <label
    //             className=" text-white font-thin text-2xl mb-6"
    //             htmlFor="password"
    //           >
    //             Password:
    //           </label>
    //           <input
    //             className="text-3xl rounded-3xl loginInput"
    //             type="password"
    //             id="password"
    //             value={password}
    //             onChange={(event) => setPassword(event.target.value)}
    //             required
    //           />
    //           <button
    //             className="bg-emerald-500 text-2xl text-white w-fit pr-24 pl-24 mx-auto p-4 my-10 rounded-full"
    //             type="submit"
    //           >
    //             Log In
    //           </button>
    //           <span>
    //             <a
    //               className=" grid  font-semibold text-green-400 text-center text-xl"
    //               href="/otp_login"
    //             >
    //               login using OTP
    //             </a>
    //           </span>
    //           <Link
    //             to="/register"
    //             className=" grid font-semibold mt-3 text-sky-400 text-center text-xl"
    //           >
    //             Create a New Account
    //           </Link>
    //           <Link
    //             to="/changepassword"
    //             className=" grid font-semibold mt-3r text-center text-xl"
    //           >
    //             Forgot password?
    //           </Link>
    //         </div>
    //       </form>
    //       {/* <span className="loginForgot">Forgot Password?</span> */}

    //       {/* <h3 className="loginLogo">Gamers-DEN</h3> */}
    //       <span className="loginDesc"></span>
    //     </div>
    //   </div>
    // </>
    <>
      <div className="min-h-screen bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 flex flex-col sm:flex-row items-center justify-center">
        <div className="hidden sm:block sm:w-1/2 lg:w-1/2 xl:w-2/4 p-3 m-5 bg-gray-500/50 rounded-3xl rounded-bl-none flex items-center justify-center">
          <h3 className=" text-5xl font-bold  text-white">Gamers-DEN</h3>
        </div>
        <div className="sm:w-1/2 lg:w-1/3 xl:w-1/4 p-8  rounded-3xl bg-gray-500/50">
          <h1 className="text-4xl font-medium text-white underline mb-4">
            Login
          </h1>
          <h2 className="text-3xl font-medium text-white mb-8">
            Welcome to Gamers-DEN
          </h2>
          <form className="w-full max-w-sm mx-auto" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-white font-thin text-2xl mb-2"
                htmlFor="email"
              >
                Email:
              </label>
              <input
                className="w-full px-3 py-2 rounded-3xl text-3xl leading-tight"
                type="email"
                id="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-white font-thin text-2xl mb-2"
                htmlFor="password"
              >
                Password:
              </label>
              <input
                className="w-full px-3 py-2 rounded-3xl text-3xl leading-tight"
                type="password"
                id="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </div>
            <div className="flex items-center justify-between mb-4">
              <button
                className="bg-emerald-500 hover:bg-emerald-600 text-white text-2xl font-semibold py-2 px-6 rounded-full"
                type="submit"
              >
                Log In
              </button>
              <a
                className="text-green-400 hover:text-green-500 text-xl font-semibold"
                href="/otp_login"
              >
                Login using OTP
              </a>
            </div>
            <div className="text-center">
              <Link
                to="/register"
                className="block text-sky-400 hover:text-sky-500 font-semibold mb-2 text-xl"
              >
                Create a New Account
              </Link>
              <Link
                to="/changepassword"
                className="block text-gray-400 hover:text-gray-500 font-semibold text-xl"
              >
                Forgot password?
              </Link>
            </div>
            <div className="text-red-500 mt-4">{err}</div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;

// <>
// <div>login</div>
// <form onSubmit={handleSubmit}>
//   <div>
//     <label htmlFor="email">Email:</label>
//     <input
//       type="email"
//       id="email"
//       value={email}
//       onChange={(event) => setEmail(event.target.value)}
//       required
//     />
//   </div>
//   <div>
//     <label htmlFor="password">Password:</label>
//     <input
//       type="password"
//       id="password"
//       value={password}
//       onChange={(event) => setPassword(event.target.value)}
//       required
//     />
//   </div>

//   <button type="submit">Log In</button>
// </form>
// </>
