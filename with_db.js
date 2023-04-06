var express = require("express");
var config = require("config");
var logger = require("./middlewares/logger");
var authenticate = require("./middlewares/authentication");

var app = express();

app.use(express.static("public"));

console.log(config.get("password"));
console.log(config.get("name"));

// middleware work in order that they are called
app.use(logger);

app.use(authenticate);

app.get("/", (req, res) => {
  res.send("Hello Database");
});

app.listen(3000, () => console.log("Listening on 3000..."));
