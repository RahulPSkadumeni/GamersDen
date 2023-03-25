import User from "../models/User.js";

export const follow = async (req, res) => {
  console.log(req.body.userId);
  console.log(req.params.id);
  if (req.body.userId !== req.params.id) {
    console.log("not match");

    try {
      const user = await User.findById(req.params.id);

      const currentUser = await User.findById(req.body.userId);
      console.log(user); //user we want to follow
      const currentUserName = currentUser.userName;

      if (!user.followers.includes(req.body.userId)) {
        console.log("going to update");
        await user.updateOne({
          $push: { followers: req.body.userId },
        });
        console.log(user.followers);

        await currentUser.updateOne({
          $push: { followings: req.params.id },
        });
        // console.log(req.body.userId);
        // await currentUser.updateOne({ $push: { followings: req.params.id } });
        // await currentUser.updateOne({ $push: { followings: req.params.id } });
        console.log("started to follow " + currentUserName);
        res.status(200).json("started to follow ");
        console.log(user.followings);
      } else {
        res.status(403).json("already following");

        console.log("already following");
      }
    } catch (err) {
      return res.status(500).json(err);
      console.log(err);
    }
  } else {
    res.status(403).json("you cant follow yourself");
  }
};

export const getUser = async (req, res) => {
  const userId = req.query.userId;
  const userName = req.query.userName;
  try {
    console.log(req.params.id);
    const user = userId
      ? await User.findById(req.params.id)
      : await User.findOne({ userName: userName });
    console.log(user);
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
  }
};
