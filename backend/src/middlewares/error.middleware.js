const config=require("../config/env");
const logger = require("../config/logger");

const errorHandler = (err, req, res, next) => {
  // console.error(err);


    // log error in development
  if (config.env === "development") {
    console.error("ERROR:", err);
  }


 logger.error("Unhandled Error", {
  message: err.message,
  stack: err.stack,
  url: req.originalUrl,
  method: req.method,
});//to can making monitoring and to making the debugging more easy
//and this one is more detailed to can now exactly which endpoint who makes this error and if we want to retest it again to know 

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};

module.exports=errorHandler;