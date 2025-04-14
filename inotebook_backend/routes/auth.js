const express = require("express");
const router = express.Router();
const { User } = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchUser = require('../middlewares/fetchUser')

router.get("/", (req, res) => {
  console.log(req.body);
  res.send("Auth route is working");
});

router.post(
  "/signup",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Email is required"),
    body("password")
      .isLength({ min: 5, max: 32 })
      .withMessage("Password must be at least 5-32 characters long")
      .matches(/[A-Z]/)
      .withMessage("Password must contain at least one uppercase letter")
      .matches(/[\W_]/)
      .withMessage("Password must contain at least one special character"),
    body("cpassword").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),
  ],
  async (req, res) => {
    const { name, email, password } = req.body;
    let success = false;
    console.log("user>>>", req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }

    try {
      const emailExists = await User.findOne({ email: email });
      if (emailExists) {
        return res.status(400).json({ success, error: "Email already exists" });
      }
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const user = new User({
        name: name,
        email: email,
        password: hashedPassword,
      });
      await user.save();
      const data = {
        user: {
          id: user.id,
        },
      };
      const jwtSecret = process.env.JWT_SECRET;
      const authToken = jwt.sign(data, jwtSecret);
      res
        .status(200)
        .json({success:true, message: "User registered successfully", authToken });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success,error: "Internal server error" });
    }
  }
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Email is required"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ error: "Please try to login with correct credentials" });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res
          .status(400)
          .json({ error: "Please try to login with correct credentials" });
      }

      const data = {
        user: {
          id: user.id,
        },
      };
      const jwtSecret = process.env.JWT_SECRET;
      const authToken = jwt.sign(data, jwtSecret);
      res
        .status(200)
        .json({ message: "User logged in successfully", success: true, authToken });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

router.post("/getuser",fetchUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});
module.exports = router;
