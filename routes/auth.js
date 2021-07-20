const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
const bcrypt = require("bcryptjs");


router.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  //check if username and password are filled in
  if (username === "" || password === "") {
    res.status(400).json({ message: "Fill username and password" });
    return;
  }
  //check for password strength
  const myRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (myRegex.test(password) === false) {
    res.status(400).json({ message: "Password is too weak" });
    return;
  }
  //check if username already exists
  const user = await User.findOne({ username });
  if (user !== null) {
    res.status(400).json({ message: "Username already exists" });
    return;
  }
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hashedPassword = bcrypt.hashSync(password, salt);
  const newUser = await User.create({
    username,
    password: hashedPassword,
  });
  res.status(200).json(newUser);
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).json({ message: "Fill username and password" });
    return;
  }
  const user = await User.findOne({ username });
  if (!user) {
    res.status(401).json({ message: "Invalid login" });
    return;
  }
  //Check for password
  if (bcrypt.compareSync(password, user.password)) {
    //Passwords match
    //Initializing the session with the current user
    req.session.currentUser = user;
    res.status(200).json(user);
  } else {
    //Passwords don't match
    res.status(401).json({ message: "Invalid login" });
  }
});

router.post("/logout", (req, res) => {
  req.session.destroy();
  res.status(200).json({ message: "user logged out" });
});

router.get("/loggedin", (req, res) => {
    if (req.session.currentUser) {
      res.status(200).json(req.session.currentUser);
      return;
    } else {
      res.status(401).json({ message: "user logged out" });
    }
  });

module.exports = router;