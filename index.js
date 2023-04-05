const express = require("express");
const Joi = require("joi");

const app = express();

app.use(express.json());

const data = [
  { id: 1, name: "Vishal" },
  { id: 2, name: "Alex" },
];

app.get("/", (req, res) => {
  return res.send("Hello World!");
});

app.get(`/api/users/:id`, (req, res) => {
  const toReturn = data.find((item) => item.id === parseInt(req?.params?.id));
  if (!toReturn) return res.status(404).send("No data with that Id");
  return res.send(toReturn);
});

app.get(`/api/users`, (req, res) => {
  return res.send(data);
});

app.post(`/api/users`, (req, res) => {
  const { error } = validateUserBody(req?.body);
  if (error) {
    return res.status(400).send({ error: error?.details[0]?.message });
  }
  const user = {
    id: data?.length + 1,
    name: req?.body?.name,
  };
  data.push(user);
  res.status(201).send(user);
});

app.put(`/api/users/:id`, (req, res) => {
  const { error } = validateUserBody(req?.body);
  if (error) {
    return res.status(400).send({ error: error?.details[0]?.message });
  }
  const toReturn = data.find((item) => item.id === parseInt(req?.params?.id));
  if (!toReturn) return res.status(404).send("No data with that Id");
  toReturn.name = req?.body?.name;
  return res.send(toReturn);
});

app.delete(`/api/users/:id`, (req, res) => {
  const toReturn = data.find((item) => item.id === parseInt(req?.params?.id));
  if (!toReturn) return res.status(404).send("No data with that Id");
  data.splice(data.indexOf(toReturn), 1);
  return res.send(data);
});

app.get(`/api/:name/:id`, (req, res) => {
  res.send(
    `Hello ${req.params.name} your id is ${req.params.id} and query params are ${req.query}!`
  );
});

function validateUserBody(userObject) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  return schema.validate(userObject);
}

app.listen(3000, () => console.log("Listening on 3000..."));
