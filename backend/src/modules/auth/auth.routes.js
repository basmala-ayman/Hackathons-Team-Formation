const express= require("express");

const router=express.Router();

const authController=require("./auth.controller");



//register 
router.post("/register",authController.register);


//verify email
router.post("/verify-email",authController.verifyEmail);



module.exports=router;


//now the next step after updaing the index rotutes and the auth routes is to make the validate file
