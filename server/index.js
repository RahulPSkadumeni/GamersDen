import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";

// importing routes
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";

import postRoutes from "./routes/posts.js";
import { register } from "./controllers/auth.js";

const app = express();
/*configurations( middleware configuration and package configuration) */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(
  cors({
    origin: ["http://localhost:3000"],
    method: ["GET", "POST"],
    credentials: true,
  })
);
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

/* Storage * git gub rep of multer*/
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

/*routes with  FILES*/

app.post("createPosts", (req, res) => {
  try {
    console.log("File uploaded successfully");
    res.send("File uploaded successfully");
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});
/*_____________Route______________middleware__________ controller(_actual logic)_____*/
app.post(
  "/auth/register",
  register
); /* should be in route file but we ned upload variable so */

/* helps to setup routes */

/* ROUTES */

app.use("/auth", authRoutes);

app.use("/users", userRoutes);

app.use("/posts", postRoutes);

// app.use("/posts/createpost", async (req, res) => {
//   console.log("first");
//   console.log(req.body);
//   console.log(req.file);
// const newPost = new Post(req.body);
// try {
//   const savePost = await newPost.save();
//   console.log(savePost);
//   res.status(200).json(savePost + " new post created");
// } catch (error) {
//   res.status(500).json(error);
// }
// });
/*mongoose setup*/
const PORT = process.env.PORT || 6001;

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port:${PORT}`));
  })
  .catch((error) => console.log(`${error}did not connect`));
