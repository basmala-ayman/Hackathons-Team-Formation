const express = require("express");

const router = express.Router();

const authController = require("./auth.controller");

const { registerSchema,
    verifyEmailSchema,
    resendVerificationSchema } = require("../auth/auth.validation");


//and getting the validate middleware function too
const validate = require("../../middlewares/validate.middleware");

//register 
//this when the user click on the register button and then we will need to send a link to its email to verify its account
router.post("/register", validate(registerSchema) ,authController.register);


//verify email
//and here when the user click on the sending link there will be request coming to me to make its account activate
//now in this request we need to get the token and we have 2 options the first to put the token as url param and the second is to put it as query param and we will follow the second
//option cause it is the standard way and more clean and scalable
//it is better to make it get methode not post methode cause in this route i get data not sending data to anyone
router.get("/verify-email", validate(verifyEmailSchema) ,authController.verifyEmail);


//resend link
//and that when the user didnot recieve any email with link so he press the resend link button again
router.post("/resend-verification",validate(resendVerificationSchema) ,authController.resendVerification);
module.exports = router;


//now the next step after updaing the index rotutes and the auth routes is to make the validate file
