// import { updateData } from "moongose/controller/comments_controller";
import express from "express";
import bcrypt from "bcrypt";

// import User from "../Models/User.js";
import User from "../models/User.js";
import { follow, getUser } from "../controllers/user.js";

import { verifyToken } from "../middleware/authorization.js";

const router = express.Router();
//update

//delete
//follow
//unfollow
//get

// router.get("/", (req, res) => {
//   console.log("its user routes");
//   res.send("haii");
// });

router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch {
        return res.status(500).json(err);
      }
    }
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(300).json("account has been updated");
    } catch {}
  } else {
    return res.status(403).json("you can  update only your account");
  }
});

//!!delete user

router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      res.status(300).json("account has been deleted");
      console.log("account deleted");
    } catch {}
  } else {
    return res.status(403).json("you can delete only  your account");
  }
});
//?? get user//

router.get("/", getUser);

//??follow or unfollow//

router.put("/:id/follow", follow);

router.put("/:id/unfollow", async (req, res) => {
  // console.log(User.findById(req.body.userId));
  // if (!User.findById(req.body.userId)) {
  //   console.log("not found");
  //   return res.status(404).json("user not found");
  // }
  let userId = req.body.userId;
  User.findOne({ _id: userId }, (err, user) => {
    if (err) {
      console.log(err);
      res.json("user not found");
      return;
    }
    console.log(user); // the user document with the specified ID
  });
  if (req.body.userId !== req.params.id) {
    console.log(req.body.userId);

    try {
      const user = await User.findById(req.params.id);

      const currentUser = await User.findById(req.body.userId);
      console.log(user); //user we want to follow
      const currentUserName = currentUser.userName;

      if (user.followers.includes(req.body.userId)) {
        console.log("going to update");
        await User.updateOne(
          { _id: req.params.id },
          {
            $pull: { followers: req.body.userId },
          }
        );
        console.log(currentUser.followings);
        console.log(req.params.id);
        console.log("req.body.userId==" + req.body.userId);

        await currentUser.updateOne({
          $pull: { followings: req.params.id },
        });

        console.log(" un follow " + currentUserName);
        res.status(200).json("started to  un follow ");
      } else {
        res.status(403).json("not following");

        console.log(" already not following");
      }
    } catch (err) {
      return res.status(500).json(err);
      console.log(err);
    }
  } else {
    res.status(403).json("you cant un follow yourself");
  }
});
// router.put("/:id/follow", async (req, res) => {
//   var currentUserId = req.body.userId;
//   if (req.body.userId !== req.params.id) {
//     try {
//       const user = await User.findById(req.params.id);
//       console.log("user===" + user);
//       // let currentUser = await User.findById(req.body.userId);
//       console.log(currentUserId);
//       const currentUser = await User.findById(req.body.userId);
//       console.log("currentUser:" + currentUser);
//       if (!user.followers.includes(req.body.userId)) {
//         await user.updateOne({ $push: { followers: req.body.userId } });
//         await currentUser.updateOne({ $push: { followings: req.params.id } });
//         await currentUser.updateOne(
//           { _id: req.body.userId },
//           {
//             $push: { followings: req.params.id },
//           }
//         );

//         res.status(200).json("user has been followed");
//       } else {
//         res.status(403).json("you allready follow this user");
//       }
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   } else {
//     res.status(403).json("you cant follow yourself");
//   }
// });

export default router;
