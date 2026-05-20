const express = require("express");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const cors = require("cors");
const app = express();

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");

const routes = require("./routes");
//cause we will use it and call it in the glocal error handler in the last
const errorHandler = require("./middlewares/error.middleware");


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
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/uploads", express.static("uploads"));

app.use("/api/v1", routes);
//routes will go here TODO: put here the entry points to all other routes that follow the api design


//and then the last thing in the app is to just calling the global error handler
app.use(errorHandler);



module.exports = app;