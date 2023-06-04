import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

/* Register user */

//  calling mongoose data base ,so should async  req api call=from from end res= respond to the frontend //

export const register = async (req, res) => {
  console.log("user detail in register  controller", req.body);
  try {
    const { firstName, lastName, phoneNumber, userName, email, password } =
      req.body;
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
      userName,
      phoneNumber,
      password: passwordHash,
      viewedProfile: Math.floor(Math.random() * 1000),
      impressions: Math.floor(Math.random() * 1000),
    });
    console.log("newuser", newUser);
    const savedUser = await newUser.save();
    console.log(savedUser, "dadafjkanfjnajnfajknf");
    res.status(201).json(savedUser); // giv response back if all above doesn't error out
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* LOGIN  */
export const login = async (req, res) => {
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

    if (!user.status) {
      return res.status(400).json({ msg: "User blocked." });
    }
    const isMatch = await bcrypt.compare(password, user.password); // check password and saved user password equal//
    /* if its not true */
    if (!isMatch) return res.status(400).json({ msg: "Invalid password" });
    console.log("first");
    /* jwt token with user id and secret in env file*/
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    /* don"t want to send password back to front end*/
    delete user.password;
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// my code for otp login

export const OtpLogin = async (req, res) => {
  try {
    /* destructure phoneNo and password from req.body */
    const { phoneNumber } = req.body;
    console.log(req.body);
    const user = await User.findOne({ phoneNumber: phoneNumber });
    if (!user) {
      return res.status(400).json({ msg: "User dose not exist." });
    }
    if (!user.status) {
      return res.status(400).json({ msg: "User blocked." });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    /* don"t want to send password back to front end*/

    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const CheckPhone = async (req, res) => {
  try {
    let { phoneNo } = req.body;

    console.log(phoneNo);
    const user = await User.findOne({ phoneNumber: phoneNo });
    console.log("user", user);
    if (!user) {
      return res.status(400).json({ msg: "User dose not exist." });
    }
    res.status(200).json({ userExist: true });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const CreateJwt = async (req, res) => {
  let { phoneNo } = req.body;
  console.log(phoneNo, " inside controller createJwt");
  try {
    const user = await User.findOne({ phoneNumber: phoneNo });
    console.log(user);
    if (!user) {
      return res.status(400).json({ msg: "User dose not exist." });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    /* don"t want to send password back to front end*/
    console.log(token);
    res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).json({ error });
  }
};
