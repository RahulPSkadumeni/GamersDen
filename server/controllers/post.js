import Post from "../models/Post.js";
import User from "../models/User.js";
export const createPost = async (req, res) => {
  console.log("ppost");
  const newPost = new Post(req.body);
  try {
    const savePost = await newPost.save();
    console.log(savePost);
    res.status(200).json(savePost + " new post created");
  } catch (error) {
    res.status(500).json(error);
  }
};

export const allTimeline = async (req, res) => {
  console.log("timeline>>");

  console.log("currentUser");
  try {
    const currentUser = await User.findById(req.params.id);

    const userPosts = await Post.find({ userId: currentUser.id });

    const friendPosts = await Promise.all(
      currentUser.followers.map((friendId) => {
        console.log(friendId);
        return Post.find({ userId: friendId });
      })
    );

    res.json(userPosts.concat(...friendPosts));
  } catch (error) {
    res.status(500).json(error);
  }
};

export const like = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post.likes.includes(req.body.userId)) {
      console.log(post);

      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("you liked this post");
    } else {
      console.log(post);
      console.log(req.body.userId);
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json("you disliked this post");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
