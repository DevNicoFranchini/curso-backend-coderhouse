const express = require("express");

const checkUserLogged = require("./../middleware/logged.js");

const router = express.Router();

router.get("/", (req, res) => {
  if (req.session.username) {
    res.redirect("/");
  } else {
    res.render("login");
  }
});

router.post("/", async (req, res) => {
  const { user } = req.body;
  req.session.username = user;
  res.redirect("/");
});

module.exports = router;
