const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");

//create a post

router.post("/", async (req, res) => {
  const newPost = new Post(req.body); 
  try {
    const savedPost = await newPost.save(); //after creating new post we have to save it
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

//update a post

router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id); //finding post by id
    if (post.userId === req.body.userId) {  //checking user
      await post.updateOne({ $set: req.body }); // it will set everything inside our body and update our post
      res.status(200).json("the post has been updated");
    } else {
      res.status(403).json("you can update only your post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete a post

router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id); //finding post by id
    if (post.userId === req.body.userId) { //checking user
      await post.deleteOne(); //deleting post
      res.status(200).json("the post has been deleted");
    } else {
      res.status(403).json("you can delete only your post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
//like / dislike a post

router.put("/:id/like", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id); //simply wahi follow ki tarah likes ke array ko update karege
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("The post has been liked");
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json("The post has been disliked");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
//get a post

router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get timeline posts

router.get("/timeline/:userId", async (req, res) => {  // here i have to change /timeline to /timeline/all bcuz it was conflicting with get post which above
  try {
    const currentUser = await User.findById(req.params.userId);  //finding user
    const userPosts = await Post.find({ userId: currentUser._id });//finding all posts of this user
    const friendPosts = await Promise.all(
      currentUser.followings.map((friendId) => {  //for each friend id find post
        return Post.find({ userId: friendId });
      })
    );
    res.json(userPosts.concat(...friendPosts))  //user posts or friends ki posts ko concate kardo
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;