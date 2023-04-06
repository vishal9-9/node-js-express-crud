const express = require("express");
const debug = require("debug")("app:debugger");

const router = express.Router();

router.get("/", (req, res) => {
  debug("Index Page Hitted");
  return res.send("Hello World!");
});

router.get(`/api/:name/:id`, (req, res) => {
  res.send(
    `Hello ${req.params.name} your id is ${req.params.id} and query params are ${req.query}!`
  );
});

module.exports = router;
