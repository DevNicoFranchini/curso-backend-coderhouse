const express = require("express");

const checkUserLogged = require("./../middleware/logged.js");

const router = express.Router();

router.get("/", checkUserLogged, (req, res) => {
  const username = req.session.username;
  req.session.destroy();
  res.render("logout", { username });
});

module.exports = router;
