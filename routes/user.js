const express = require("express");
const Joi = require("joi");
// to use you have to set env var DEBUG=app:debug
const debug = require("debug")("app:debugger");

const router = express.Router();

const data = [
  { id: 1, name: "Vishal" },
  { id: 2, name: "Alex" },
];

router.get(`/:id`, (req, res) => {
  debug("user with id api hitted");
  const toReturn = data.find((item) => item.id === parseInt(req?.params?.id));
  if (!toReturn) return res.status(404).send("No data with that Id");
  return res.send(toReturn);
});

router.get(``, (req, res) => {
  return res.send(data);
});

router.post(``, (req, res) => {
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

router.put(`/:id`, (req, res) => {
  const { error } = validateUserBody(req?.body);
  if (error) {
    return res.status(400).send({ error: error?.details[0]?.message });
  }
  const toReturn = data.find((item) => item.id === parseInt(req?.params?.id));
  if (!toReturn) return res.status(404).send("No data with that Id");
  toReturn.name = req?.body?.name;
  return res.send(toReturn);
});

router.delete(`/:id`, (req, res) => {
  const toReturn = data.find((item) => item.id === parseInt(req?.params?.id));
  if (!toReturn) return res.status(404).send("No data with that Id");
  data.splice(data.indexOf(toReturn), 1);
  return res.send(data);
});

function validateUserBody(userObject) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  return schema.validate(userObject);
}

module.exports = router;
