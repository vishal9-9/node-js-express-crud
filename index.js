const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get(`/api/:name/:id`, (req, res) => {
    res.send(`Hello ${req.params.name} your id is ${req.params.id} and query params are ${req.query}!`)
});

app.listen(3000, () => console.log("listening on 3000..."))