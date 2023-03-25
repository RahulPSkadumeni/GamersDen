import React, { useState } from "react";
import { createBrowserRouter } from "react-router-dom";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Admin from "./pages/admin/Admin";
import GroupPages from "./pages/GroupPages/GroupPages";
import GroupPage from "./pages/Groups/GroupPage";
import Test from "./pages/test";
import Home from "./pages/Home/Home";
import Login from "./pages/Login";
import Otp_login from "./pages/Otp_login";
import Profilepage from "./pages/Profilepage/Profilepage";
import Notification from "./pages/Notification/Notifications";

import Register from "./pages/Register";
import ErrorPage from "./error-page";
//theme select//
import { useMemo } from "react";
import { useSelector } from "react-redux";
// import { CssBaseline, ThemeProvider } from "@mui/material";
// import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";

const AppRouter = () => {
  const mode = useSelector((state) => state.mode);
  // const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/register"
          element={!isAuth ? <Register /> : <Navigate to="/" />}
        />
        <Route path="/otp_login" element={<Otp_login />} />
        <Route
          path="/login"
          element={!isAuth ? <Login /> : <Navigate to="/" />}
        />
        {/* <Route exact path="/register" element={<Register />} /> */}
        <Route
          path="/"
          element={isAuth ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/profile/:userName"
          element={isAuth ? <Profilepage /> : <Navigate to="/" />}
        />

        <Route path="/test" element={<Test />} />

        {/* <Route 
         path="/profile" element={<Profilepage />} /> */}
        {/*<Route exact path="/notification" element={<Notification />} />
        <Route exact path="/Group" element={<GroupPage />} />
        <Route exact path="/Groups" element={<GroupPages />} />

        <Route exact path="/admin" element={<Admin />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
