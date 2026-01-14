// usermodel
const userModel = require("../models/userModel");
// jwt import
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res) => {
  try {
    let userName = req.body.userName;
    let password = req.body.password;
    let email = req.body.email;

    if (userName && password && email) {
      // register logic
      let existingUser = await userModel.findOne({ email: email });

      if (existingUser) {
        res
          .status(409)
          .json({ message: "user is already register with this email" });
      } else {
        let newUser = new userModel({ userName, email, password });
        await newUser.save();
        res.status(201).json({ message: "sucessfully Resgistered", newUser });
      }
    } else {
      res.status(400).json({ message: "please fill the fields" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong in server" });
  }
};

exports.loginUser = async (req, res) => {
  try {
    // let email=req.body.email -destructured cheythath anu use cheythath
    let { email } = req.body;
    let { password } = req.body;
    let existingUser = await userModel.findOne({ email: email });
    if (existingUser) {
      // login logic
      if (existingUser.password == password) {
        // jwt logic
        let payload = {
          userName: existingUser.userName,
          email: existingUser.email,
          userType: existingUser.userType,
        };
        let token = jwt.sign(payload, process.env.jwtSecertKey);

        res
          .status(200)
          .json({ message: "login sucessfull", token, existingUser });
      } else {
        res.status(400).json({ message: "invalid password" });
      }
    } else {
      res.status(400).json({ message: "user with email id doesnt exists" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error occured in server" });
  }
};

exports.googleLoginAPI = async (req, res) => {
  try {
    let { email, userName, proPic } = req.body;

    let existingUser = await userModel.findOne({ email: email });
    if (existingUser) {
      // loginlogic

      let payload = {
        userName: existingUser.userName,
        email: existingUser.email,
        usertype: existingUser.usertype,
      };
      let token = jwt.sign(payload, process.env.jwtSecertKey);

      res
        .status(200)
        .json({ message: "login sucessfull", token, existingUser });
    } else {
      // register logic
      let newUser = new userModel({
        userName,
        email,
        password: "googlePswd",
        proPic,
      });
      await newUser.save();

      let payload = {
        userName: newUser,
        userName,
        email: newUser,
        email,
        usertype: newUser.usertype,
      };
    }
    let token = jwt.sign(payload, process.env.jwtSecertKey);

    res.status(201).json({ message: "login sucessfull", token });
  } catch (error) {
    res.status(500).json({ message: "something went wrong in server" });
  }
};
