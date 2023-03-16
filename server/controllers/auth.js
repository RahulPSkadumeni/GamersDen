import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

/* Register user */

//  calling mongoose data base ,so should async  req api call=from from end res= respond to the frontend //

export const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const salt = await bcrypt.genSalt(); //use this for salt password

    const passwordHash = await bcrypt.hash(password, salt); // hash password using salt and password;

    const newUser = new User({
      /*creating new user
    password salted and saved when login password salted and hashed 
    then checked with saved one
     the give them json web token  */

      firstName,
      lastName,
      email,
      password: passwordHash,
      viewedProfile: Math.floor(Math.random() * 1000),
      impressions: Math.floor(Math.random() * 1000),
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser); // giv response back if all above doesn't error out
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* LOGIN  */
export const login = async (req, res) => {
  try {
    /* destructure email and password fro req.body */
    const { email, password } = req.body;
    console.log(req.body);
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ msg: "User dose not exist." });
    }
    const isMatch = await bcrypt.compare(password, user.password); // check password and saved user password equal//
    /* if its not true */
    if (!isMatch) return res.status(400).json({ msg: "Invalid password" });

    /* jwt token with user id and secret in env file*/
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    /* don"t want to send password back to front end*/
    delete user.password;
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
