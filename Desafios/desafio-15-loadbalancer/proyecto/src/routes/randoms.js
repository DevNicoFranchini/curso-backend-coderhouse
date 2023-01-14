const express = require("express");
const { fork } = require("child_process");

const router = express.Router();

router.get("/", (req, res) => {
  let { cant } = req.query;
  const childProcess = fork("src/utils/randomNums.js");
  cant
    ? childProcess.send({ order: "start", cant })
    : childProcess.send({ order: "start", cant: 100000000 });

  childProcess.on("message", (message) =>
    res.render("randoms", { message: JSON.stringify(message, null, 2) })
  );
});

module.exports = router;
