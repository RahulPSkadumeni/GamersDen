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
import commentRoutes from "./routes/comment.js";
// import messageRoute from "./routes/message.js";
import chatRoutes from "./routes/ChatRoute.js";
import searchRoute from "./routes/searchRoute.js";

import postRoutes from "./routes/posts.js";
import { register } from "./controllers/auth.js";
import messageRoutes from "./routes/message.js";
import GroupRoutes from "./routes/GroupRoutes.js";
import AdminRoutes from "./routes/AdminRoutes.js";
import NotificationRoutes from "./routes/NotificationRoutes.js";
const app = express();
/*configurations( middleware configuration and package configuration) */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

app.use(express.json());
//app.use(helmet());
// app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
// app.use(
//   cors({
//     //origin: "https://main.d3d91l7npjddz9.amplifyapp.com",
//     origin: "http://localhost:3000",
//     method: ["GET", "POST", "PATCH", "PUT"],
//     credentials: true,
//     preflightContinue: true,
//     optionsSuccessStatus: 204,
//     allowedHeaders: ["Content-Type", "Authorization"],
//   })
// );
//>>>>>>>>>>>>>>>>>>>>>>>>
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST", "PATCH", "PUT"],
//     credentials: true,
//     preflightContinue: true,
//     optionsSuccessStatus: 204,
//     allowedHeaders: ["Content-Type", "Authorization"],
//     // Set the Access-Control-Allow-Credentials header
//     exposedHeaders: ["Access-Control-Allow-Credentials"],
//   })
// );

// Set the header for all responses
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Credentials", "true");
//   next();
// });
// app.options("/auth/login", (req, res) => {
//   res.header(
//     "Access-Control-Allow-Origin",
//     "https://new-branch-name.d2v8amzg8h8i4t.amplifyapp.com"
//   );
//   res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT");
//   res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   res.header("Access-Control-Allow-Credentials", "true");
//   res.sendStatus(200);
// });

//>>>>>>>>>>>>>>>>>>>>>>>>

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
  "/register",
  register
); /* should be in route file but we ned upload variable so */

/* helps to setup routes */

/* ROUTES */

app.use("/auth", authRoutes);

app.use("/users", userRoutes);

app.use("/posts", postRoutes);
app.use("/search", searchRoute);
app.use("/comment", commentRoutes);
app.use("/chat", chatRoutes);
app.use("/message", messageRoutes);
app.use("/group", GroupRoutes);
app.use("/admin", AdminRoutes);
app.use(
  "/notification",

  NotificationRoutes
);
// app.use("/search" SearchRoutes);

// app.use("/message", messageRoute);

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
