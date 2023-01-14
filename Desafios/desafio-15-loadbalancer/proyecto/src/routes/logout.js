const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  const username = req.session.passport.user.username;
  req.logout((err) => {
    if (err) {
      console.log(err);
      return res.send("Hubo un error al cerrar sesion");
    }
    req.session.destroy();
    res.render("logout", { username });
  });
});

module.exports = router;
