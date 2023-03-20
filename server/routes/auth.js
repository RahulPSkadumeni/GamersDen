import express from "express";
import { login, OtpLogin, CheckPhone, CreateJwt } from "../controllers/auth.js";

/*setup routers  :  */
const router = express.Router();

router.post("/login", login);
router.post("/otpLogin", OtpLogin);
router.post("/checkphone", CheckPhone);
router.post("/createJwt", CreateJwt);
export default router;
