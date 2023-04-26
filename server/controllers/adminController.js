import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const adminLogin = async (req, res) => {
  console.log("hereeeeeeeeee");
  try {
    /* destructure email and password from req.body */
    const { email, password } = req.body;
    console.log(email);
    console.log(password);
    const user = await User.findOne({ email: email });
    console.log(user);
    if (!user) {
      return res.status(400).json({ msg: "User dose not exist." });
    }
    if (user.isAdmin) {
      console.log(">>>>>>>>>vvvvvvvvvvvvvvvvvvvvv>>>>>>>>>");
      const isMatch = await bcrypt.compare(password, user.password); // check password and saved user password equal//
      /* if its not true */
      if (!isMatch) return res.status(400).json({ msg: "Invalid password" });
      console.log("first");
      /* jwt token with user id and secret in env file*/
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

      /* don"t want to send password back to front end*/
      delete user.password;
      res.status(200).json({ token, user });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
