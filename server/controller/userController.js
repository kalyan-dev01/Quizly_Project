const userModel = require("../model/userSchema");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { auth } = require("../middleware/auth");

const SignUp = async (req, res) => {
  const { email, password, firstname, lastname, number } = req.body;

  try {
    if (!email || !password || !firstname || !lastname || !number) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are mandatory" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: "Invalid Email" });
    }


    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      console.log("Account already exists");
      return res
        .status(400)
        .json({ success: false, message: "Account already exists" });
    }

    if (
      !validator.isStrongPassword(password, {
        minLength: 8,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Password must be at least 8 characters long and include 1 uppercase letter, 1 number, and 1 symbol",
      });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = await userModel.create({
      email,
      password: hashedPassword,
      firstname,
      lastname,
      number,
    });

    const token = jwt.sign(
      { id: user._id, name: user.firstname + " " + user.lastname },
      process.env.SECRETKEY,
      { expiresIn: "35d" }
    );

    return res.status(200).json({
      success: true,
      message: "Account created successfully",
      token,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Server Error", error: err.message });
  }
};

// Login controller
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user._id, name: user.firstname + " " + user.lastname },
      process.env.SECRETKEY,
      { expiresIn: "35d" }
    );

    return res
      .status(200)
      .json({ success: true, message: "Successfully logged in", token });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Server Error", error: err.message });
  }
};

const userProfile = async (req, res) => {
  const userid = req.user.id;
  const userData = await userModel.findById({ _id: userid });
  res.json({ userData });
};

const TestAPI = (req, res) => {
  res.json({ message: "API WORKING" });
};

module.exports = { SignUp, login, userProfile, TestAPI };
