import express from "express";
import { login, OtpLogin, CheckPhone, CreateJwt } from "../controllers/auth.js";
import { follow } from "../controllers/user.js";

import { verifyToken } from "../middleware/authorization.js";
/*setup routers  :  */
const router = express.Router();
// router("/login").post(verifyToken.lo)
router.post("/login", login);
router.post("/otpLogin", OtpLogin);
router.post("/checkphone", CheckPhone);
router.post("/createJwt", CreateJwt);
router.put("/:id/follow", follow);

// post controllers//

export default router;
