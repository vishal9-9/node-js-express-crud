const express = require("express");

const userRouter = require("./routes/user");
const homeRouter = require("./routes/home");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", userRouter);
app.use("/", homeRouter);

app.listen(3001, () => console.log("Listening on 3001..."));
