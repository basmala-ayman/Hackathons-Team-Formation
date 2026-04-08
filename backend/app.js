const express = require("express");
const app = express();

const routes = require("./src/routes");


app.use(express.json());


app.use("/api", routes);

module.exports = app;