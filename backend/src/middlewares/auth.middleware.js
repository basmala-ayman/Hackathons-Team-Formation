// just a placeholder for now - will be implemented in issue #17
const AppError = require("../utils/AppError");
const jst=require("jsonwebtoken");
const config = require("../config/env");

//this middleware for protection just for checking if the user is logged in or no
const protect = (req, res, next) => {
  
   const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new AppError("Not authenticated", 401));
  }

  const token = authHeader.split(" ")[1];

   try {
    const decoded = jwt.verify(token, config.jwt.secret);

    // attach user data to request which is the payload the id and its role 
    req.user = decoded;

    next();
  } catch (err) {
    return next(new AppError("Invalid or expired token", 401));
  }

};

module.exports = { protect };