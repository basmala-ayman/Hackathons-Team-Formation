//the flow is route --> controller --> service --> repository --> prisma and the database

//this controller its main goal is to get the request and getting the data from it and call service and then return the response later thats only 

const authService = require("./auth.service");

// register
const register = async (req, res,next) => {
  try {

    const result = await authService.register(req.body);

    //and then returning the response
    res.status(201).json({
      success: true,
      message: "User registered successfully. Please verify your email.",
      data: result,
    });

  } catch (err) {
    next(err);//to make it go to the global error handler
  }

};

// verify email
const verifyEmail = async (req, res,next) => {

  try {

//now lets get the token that as query param
const {token} = req.query;

const result = await authService.verifyEmail(token);

res.status(200).json({
      success: true,
      message: result.message,
      data : null,
    });

  } catch (err) {
    next(err);//to make it go to the global error handler
  }

};

// resend verification
const resendVerification = async (req, res,next) => {

  try {

    const { email } = req.body;

    const result = await authService.resendVerification(email);

    res.status(200).json({
      success: true,
      message: result.message,
      data: null,
    });

  } catch (err) {
    next(err);//to make it go to the global error handler
  }

};

module.exports = {
  register,
  verifyEmail,
  resendVerification,
};