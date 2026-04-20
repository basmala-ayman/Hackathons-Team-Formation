//the service layer its main and only goal is the lgoic and it is the brain 
const authRepository = require("./auth.repository");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const AppError = require("../../utils/AppError");
const emailService = require("../../services/email.services");
const config = require("../../config/env");

// #16 register user
const register = async (data) => {
    //this data had email,name,password and we need to make new user instance for this user 
    const { name, email, password } = data;

    //1- check if the user is existed or no
    const existingUser = await authRepository.findByEmail(email);
    if (existingUser) {
        throw new AppError("User already exists", 400);
    }

    //2- generate for this user verification token that will be sent in the link 
    const verificationToken = crypto.randomBytes(32).toString("hex");

    //and we need to in the same time of generating hte token to make its expiry time
    const verificationTokenExpires = new Date();
    //we will make it exppire after 1 hour to be balanced between security and the user experience
    verificationTokenExpires.setHours(
        verificationTokenExpires.getHours() + 1
    );


    //3-hash the password for the security
    const hashedPassword = await bcrypt.hash(password, 10);//10 is the salt size

    //4- create instance for the user in the database with making it invalid=false
    const user = await authRepository.createUser({
        name,
        email,
        password: hashedPassword,
        verificationToken,
        verificationTokenExpires,
        isVerified: false,
    });


    //5-and then we will email hasing link+verification token
    await emailService.sendVerificationEmail(email, verificationToken);

    //6-return response to the controller caller function to enable it return the response
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        isVerified: user.isVerified,
    };

};

// #16  verify email
const verifyEmail = async (token) => {


    //2-find user by token and that cause i already stored it in the db
    const user = await authRepository.findByVerificationToken(token);

    //3-check if the user not existed so that means that bad request
    if (!user) {
        throw new AppError("Invalid token", 400);
    }

    //then now remaining to check if yes the user existed but what about if the token is already expired?
    //this condition means if the user already have expire time and its expiry (which hasing the end date for this token that after it it will be exoired) if less than the current time so yes it is expired
    if (user.verificationTokenExpires && user.verificationTokenExpires < new Date()) {
        throw new AppError("Token expired, please resend verification email", 400);
    }

    //4- mark the user as verified
    //but what about if he already verified so we need to check before
    if (user.isVerified) {
        throw new AppError("Email already verified", 400);
    }
    //5- remove verificationtoken for the user
    //6- save user in the database 

    const updatedUser = await authRepository.updateUser(user.id, {
        isVerified: true,
        verificationToken: null,
    })

    //7- return success to controller
    return {
        message: "Email verified successfully",
    };
};

// #16  resend verification email
const resendVerification = async (email) => {

    //1-find user
    const user = await authRepository.findByEmail(email);

    if (!user) {
        throw new AppError("User not found", 404);
    }

    //2-check if it is already verified
    if (user.isVerified) {
        throw new AppError("Email already verified", 400);
    }

    //3- generate new token with new expiry
    const newToken = crypto.randomBytes(32).toString("hex");

    const newExpiry = new Date();
    newExpiry.setHours(newExpiry.getHours() + 1);

    //4-update the user
    await authRepository.updateUser(user.id, {
        verificationToken: newToken,
        verificationTokenExpires: newExpiry,
    });

    //5-send email again 
    await emailService.sendVerificationEmail(email, newToken);

    // 6- return function to the controller
    return {
        message: "Verification email resent successfully",
    };
};


//  #17  login 
const login = async (data) => {

    const { email, password } = data;

    const user = await authRepository.findByEmail(email);
    if (!user) {
        throw new AppError("Invalid credentials", 401);
    }

    //now first we need to check the coming and hashed password in the db matched
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new AppError("Invalid credentials", 401);
    }

    if (!user.isVerified) {
        throw new AppError("Please verify your email first", 403);
    }


    //generate jst of this user 
    const token = jwt.sign(
        {
            userId: user.id,
            role: user.role,
        },
        config.jwt.secret,
        {
            expiresIn: config.jwt.expiresIn,
        }
    );

    //and then return the response back

     return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };

};


module.exports = {
    register,
    verifyEmail,
    resendVerification,
    login,
};