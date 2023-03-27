import User from "../models/User.js";

export const updateUser = async (req, res) => {
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
};

export const deleteUser = async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      res.status(300).json("account has been deleted");
      console.log("account deleted");
    } catch {}
  } else {
    return res.status(403).json("you can delete only  your account");
  }
};

export const findUser = async (req, res) => {
  try {
    console.log(req.params.id);
    const user = await User.findById(req.params.id);

    res.status(200).json(user);
  } catch (err) {
    console.log(err);
  }
};

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

export const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;

    const user = await User.findById(id);
    const friend = await User.findById(friendId);
    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((id) => id != friendId);
      friend.friends = friend.friends.filter((id) => id != id);
    } else {
      user.friends.push(friendId);
      friend.friends.push(Id);
    }
    await user.save;
    await friend.save;
    const friends = await Promise.all(
      await user.friends.map((id) => User.findById(id))
    );
    res.status(200).json(friends);
  } catch (error) {
    res.status(404).json(error);
  }
};

export const getUserFriends = async (req, res) => {
  const id = req.params;
  const user = await User.findById(id);

  try {
    const friends = await user.friends.map((id) => User.findById(id));
    res.status(200).json(friends);
  } catch (error) {
    res.status(404).json(error);
  }
};
