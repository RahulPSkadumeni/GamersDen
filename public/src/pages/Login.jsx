import React from "react";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import "./login.css";
import Form from "./Form";

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
import { useNavigate } from "react-router-dom";

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
    <>
      <form onSubmit={handleSubmit} className="login">
        <div className="loginWrapper">
          <div className="loginLeft">
            <h2 className="loginLogo">Welcome to Gamers DEN</h2>
            {/* <h3 className="loginLogo">Gamers-DEN</h3> */}
            <span className="loginDesc"></span>
          </div>
          <div className="loginRight">
            <div className="loginBox">
              <div>{err}</div>
              {/* <input placeholder="Email" className="loginInput" /> */}
              <label htmlFor="email">Email:</label>
              <input
                className="loginInput"
                type="email"
                id="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
              {/* <input placeholder="Password" className="loginInput" /> */}
              <label htmlFor="password">Password:</label>
              <input
                className="loginInput"
                type="password"
                id="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
              <button className="loginButton" type="submit">
                Log In
              </button>
              {/* <button className="loginButton">Log In</button> */}
            </div>
          </div>
        </div>
      </form>
      <span className="loginForgot">Forgot Password?</span>
      <button className="loginRegisterButton">Create a New Account</button>
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
