// just a placeholder for now - will be implemented in issue #17
const AppError = require("../utils/AppError");
const jwt = require("jsonwebtoken");
const config = require("../config/env");

//this middleware for protection just for checking if the user is logged in or no

//this middleware is for authentication

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


//-----------------------------------------

//just there is very important note here that the order of calling this middlewares in the routes will be important
//cause the first thing need to be called is the protect cause it is for authentication and it add the role of the user in the request which
//will help us in the second middleware which will be for authorization and that will deponds on this role that is in the request
//-------------------------------


//and now lets define the second middleware for the authorization
// #19 here we use RBAC which means role based access control 
//and this function takes the allowed roels rather than making static conditions that be more flexable and more scalabe and thats why we used the REST PARAMETERS
const authorize = (...allowedRoles) => {

  return (req, res, next) => {
    //cause we say the order is important we need to check that the user is already authenticated 
    if (!req.user) {
      return next(new AppError("Not authenticated", 401));
    }

    if (!allowedRoles.includes(req.user.role)) {
      //so that means this request from this user not authorized to continue
      return next(new AppError("Forbidden", 403));
    }

    //if he is allowed just continue in the flow
    next();
  }
};


module.exports = { protect, authorize };