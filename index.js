const express = require("express");
const Joi = require("joi")

const app = express();

app.use(express.json())

const data = [
    { "id": 1, "name": "Vishal" },
    { "id": 2, "name": "Alex" }
]

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.get(`/api/users/:id`, (req, res) => {
    const toReturn = data.find(item => item.id === parseInt(req?.params?.id))
    if (!toReturn) res.status(404).send("No data with that Id")
    res.send(toReturn)
});

app.get(`/api/users`, (req, res) => {
    res.send(data)
})

app.post(`/api/users`, (req, res) => {

    const schema = Joi.object({
        name: Joi.string().min(3).required()
    })

    const result = schema.validate(req?.body)

    if (result?.error){
        res.status(400).send({error: result?.error?.details[0]?.message})
        return
    }

    const user = {
        "id": data?.length + 1,
        "name": req?.body?.name
    }
    data.push(user)
    res.status(201).send(user)
})

app.get(`/api/:name/:id`, (req, res) => {
    res.send(`Hello ${req.params.name} your id is ${req.params.id} and query params are ${req.query}!`)
});


app.listen(3000, () => console.log("listening on 3000..."))