const winston = require("winston");

const logger= winston.createLogger({
level:"info",//it means it will log anything more than or in the same level of info level

format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
),
transports:[
    new winston.transports.Console(),
    //the path here will make the logs in the root of the project and that cause
    //node js start working and reading the path starting from the process.pwd which will be the root
    new winston.transports.File({filename:"logs/app.log"})
],
});

module.exports=logger;