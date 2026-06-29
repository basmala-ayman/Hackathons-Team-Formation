const express = require("express");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const cors = require("cors");
const app = express();

const routes = require("./src/routes");


app.use(express.json());

//helmet package is to adding security headers for each returing response 
//like telling the browser for example  use https so its main goal is for protection
app.use(helmet());


//and the cors is to allow specific persons to can talking to the server 
//cause the backend server is on 3000 port so if there is any another request from port 5173 for example so it will not accept it cause there is difference origins
//and here coming the goal of the cors package 

//TODO: BEFORE PRODUCITON FOR MORE SECURITY WE WILL NEED TO UPDATE THIS
app.use(cors())

//this for protecting from the DDOS /SPAM so we need to mention for each ip specific number of requests allowed to it 
app.use(rateLimit({
    //here meaning in each 15 minuites each user can make just 100 requests 
    windowMs: 15 * 60 * 1000,
    max: 100,
}));


app.use("/api", routes);

module.exports = app;