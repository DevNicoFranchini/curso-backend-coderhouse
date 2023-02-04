const express = require("express");
const passport = require("passport");

const router = express.Router();

router.get("/", (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect("/");
  } else {
    res.render("login");
  }
});

router.post(
  "/",
  passport.authenticate("login", {
    successRedirect: "/",
    failureRedirect: "/loginError",
  }),
  (req, res) => {
    res.redirect("/");
  }
);

module.exports = router;
