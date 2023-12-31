const express = require("express");
const User = require("../models/Users");
const router = express.Router();
const { generateToken, validateToken } = require("../config/tokens");
const { validateAuth } = require("../config/middlewares/auth");

router.post("/register", (req, res) => {
  User.create(req.body).then((user) => {
    res.status(201).json({ redirectUrl: "/nueva-ruta" });
  });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  User.findOne({ where: { email } }).then((user) => {
    if (!user) return res.sendStatus(401);
    user.validatePassword(password).then((isValid) => {
      if (!isValid) return res.sendStatus(401);

      const payload = {
        email: user.email,
        name: user.name,
        lastname: user.lastname,
        myList: user.myList,
      };

      const token = generateToken(payload);

      res.cookie("token", token, {
        sameSite: "none",
        httpOnly: true,
        secure: true,
      });

      res.send(payload);
    });
  });
});

router.get("/me", validateAuth, (req, res) => {
  res.send(req.user);
});

router.post("/logout", (req, res) => {
  res.clearCookie("token");

  res.sendStatus(204);
});

module.exports = router;
