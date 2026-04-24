//the flow is route --> controller --> service --> repository --> prisma and the database

//this controller its main goal is to get the request and getting the data from it and call service and then return the response later thats only 

const authService = require("./auth.service");
const AppError = require("../../utils/AppError");

// register
const register = async (req, res, next) => {
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
const verifyEmail = async (req, res, next) => {

  try {

    //now lets get the token that as query param
    const { token } = req.query;

    const result = await authService.verifyEmail(token);

    res.status(200).json({
      success: true,
      message: result.message,
      data: null,
    });

  } catch (err) {
    next(err);//to make it go to the global error handler
  }

};

// resend verification
const resendVerification = async (req, res, next) => {

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


//login
const login = async (req, res, next) => {

  try {
    const result = await authService.login(req.body);

    res.status(200).json({
      success: true,
      message: "Logged in successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }

};

//controller for refresh token again and that cause we will take refresh token and then we will return new refresh token and new access token
const refreshTokenHandler = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return next(new AppError("Refresh token is required", 400));
    }

    const result = await authService.refreshToken(refreshToken);

    res.status(200).json({
      success: true,
      message: "Token refreshed successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};


//#20 lets define its controller
const googleAuth = async (req, res, next) => {
  try {
    const { token } = req.body;

    const result = await authService.googleAuth(token);

    res.status(200).json({
      success: true,
      message: "Google login successful",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};


// #21 making the forget password logic
const forgetPassword = async (req, res, next) => {
  try {
    const result = await authService.forgotPassword(req.body.email);

    res.status(200).json({
      success: true,
      message: result.message,
      data: null,
    });
  } catch (err) {
    next(err);
  }
};


//#21 making the reset password controller
const resetPassword = async (req, res, next) => {
  try {

    const { token, newPassword } = req.body;
    const result = await authService.resetPassword(token, newPassword);

    res.status(200).json({
      success: true,
      message: result.message,
      data: null,
    });

  } catch (err) {
    next(err);
  }
};

module.exports = {
  register,
  verifyEmail,
  resendVerification,
  login,
  refreshTokenHandler,
  googleAuth,
  forgetPassword,
  resetPassword,

};