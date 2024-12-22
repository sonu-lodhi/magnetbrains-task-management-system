const { Router } = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { UserModel } = require("../Model/User.model");

const UserRouter = Router();

UserRouter.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  const result = await UserModel.findOne({ email });

  if (result) {
    res.send("Email Already Existed");
  } else {
    bcrypt.hash(password, 5, async (err, hash) => {
      if (err) {
        res.send("Something Wrong with Signup");
      } else {
        const newSignup = new UserModel({
          name: name,
          email: email,
          password: hash,
        });
        const save = newSignup.save();
        res.send({ message: "Signup Successfully" });
      }
    });
  }
});

UserRouter.post("/login", async (req, res) => {
  const { name, email, password } = req.body;
  const user = await UserModel.findOne({ email });
  const hash = user.password;

  bcrypt.compare(password, hash, (err, result) => {
    if (err) {
      console.log(err);
      res.send({ message: "Something wrong with login", err });
    }
    if (result) {
      const expiresIn = "1d";
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
        expiresIn,
      });
      res.send({ message: "Login Successful", token });
    } else {
      res.send({ message: "Invalid Credential" });
    }
  });
});

module.exports = {
  UserRouter,
};
