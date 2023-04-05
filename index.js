const express = require("express");

const app = express();

const data = [
    {"id": 1 , "name": "Vishal"},
    {"id": 2 , "name": "Alex"}
]

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get(`/api/user/:id`, (req, res) => {
    const toReturn = data.find(item => item.id === parseInt(req?.params?.id))
    if (!toReturn) res.status(404).send("No data with that Id")
    res.send(toReturn)
});

app.get(`/api/:name/:id`, (req, res) => {
    res.send(`Hello ${req.params.name} your id is ${req.params.id} and query params are ${req.query}!`)
});


app.listen(3000, () => console.log("listening on 3000..."))