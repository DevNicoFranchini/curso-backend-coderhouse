const express = require("express");

const checkUserLogged = require("./../middleware/logged.js");

const router = express.Router();

router.get("/", (req, res) => {
  if (req.session.username) {
    return res.render("home");
  } else {
    res.redirect("/login");
  }
});

router.post("/", async (req, res) => {
  const { user } = req.body;
  req.session.username = user;
  res.redirect("/");
});

router.get("/login", (req, res) => {
  const { user } = req.query;

  if (req.session.username) {
    res.render("home");
  } else if (user) {
    req.session.username = user;
    res.render("home");
  } else {
    res.render("login");
  }
});

router.get("/logout", checkUserLogged, (req, res) => {
  const username = req.session.username;
  req.session.destroy();
  res.render("logout", { username });
});

module.exports = router;
