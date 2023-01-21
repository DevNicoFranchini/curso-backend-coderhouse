const express = require("express");
const passport = require("passport");

const router = express.Router();

router.get("/", (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect("/");
  } else {
    res.render("signup");
  }
});

router.post(
  "/",
  passport.authenticate("signup", {
    successRedirect: "/",
    failureRedirect: "/signupError",
  }),
  (req, res) => {
    res.redirect("/");
  }
);

module.exports = router;
