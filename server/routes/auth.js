import express from "express";
import { login, OtpLogin, CheckPhone, CreateJwt } from "../controllers/auth.js";
// import { follow } from "../controllers/user.js";

import { verifyToken } from "../middleware/authorization.js";
/*setup routers  :  */
console.log("hai auth root");
const router = express.Router();
router.post("/login", login);
router.post("/otpLogin", OtpLogin);
router.post("/checkPhone", CheckPhone);
router.post("/createJwt", CreateJwt);

// post controllers//

export default router;
