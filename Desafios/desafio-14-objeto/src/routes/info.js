const express = require("express");

const router = express.Router();

const info = {
  Argumentos: process.argv.slice(2),
  SO: process.platform,
  Node: process.version,
  RSS: JSON.stringify(process.memoryUsage(), null, "\t"),
  Path: process.execPath,
  Id: process.pid,
  Folder: process.cwd(),
};

router.get("/", (req, res) => {
  res.render("info", { info });
});

module.exports = router;
