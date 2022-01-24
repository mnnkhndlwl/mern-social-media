const router = require("express").Router();
const User = require("../models/User");  //using user model here
const bcrypt = require("bcrypt");

//REGISTER
router.post("/register", async (req, res) => {
  try {
    //generate new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //create new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    //save user and respond
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err)
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });//findone Returns one document that satisfies the specified query criteria on the collection
    !user && res.status(404).json("user not found");

    const validPassword = await bcrypt.compare(req.body.password, user.password) //user.password wo password hai hame apne database se mil rha hai or req.body.passowrd wo passowrd hai ham de rhe hai or ham dono ko compare kar rhe hai
    !validPassword && res.status(400).json("wrong password")

    res.status(200).json(user)
  } catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;