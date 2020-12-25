const { Router } = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");
const router = Router();

//  /api/auth/register/

router.post(
  "/register",
  [
    check("email", "Wrong Email"),
    // .isEmail(),
    check("password", "Wrong password"),
    // .isLength({ min: 6 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ errors: errors.array(), message: "Ooops.." });
      }

      console.log(req.body, "BODY");

      const { email = "", password = "" } = req.body;

      const candidate = await User.findOne({ email });

      if (candidate) {
        return res.status(400).json({ message: "Email already exist" });
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      const user = new User({ email, password: hashedPassword });

      await user.save();

      res.status(201).json({ message: "User created" });
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  }
);

router.post(
  "/login",
  [
    check("email", "Wrong Email").normalizeEmail().isEmail(),
    check("password", "Wrong password").exists(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ errors: errors.array(), message: "Ooops.." });
      }

      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ message: "Wrong pasword" });
      }

      const token = jwt.sign(
        {
          userId: user.id,
        },
        config.get("jwtSecret"),
        {
          expiresIn: "1h",
        }
      );

      res.json({ token, userId: user.id });

      res.status(201).json({ message: "User created" });
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  }
);

module.exports = router;
