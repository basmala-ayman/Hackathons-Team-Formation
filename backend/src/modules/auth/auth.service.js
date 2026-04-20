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
//here now according to the #18 updation we will need to make refresh token and access token and sending them to the front
//so when the user login we send to him the access token and the refresh token too
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


    // #17 here the first part related to access token prepare it to be sent 
    //generate jst of this user 
    const accessToken = jwt.sign(
        {
            userId: user.id,
            role: user.role,
        },
        config.jwt.secret,
        {
            expiresIn: config.jwt.expiresIn,
        }
    );


    // #18 and then here make the refresh token ready to sent it too
    const refreshToken = crypto.randomBytes(40).toString("hex");
    await authRepository.createRefreshToken({
        userId: user.id,
        token: refreshToken,
        expiresAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    });
    //making the refresh token expire after 3 days only for more security rather than 1 week  

    //and then return the response back

    return {
        accessToken,
        refreshToken,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
        },
    };

};


//but if the user is not log in and the access token expire the front end will already send request for refresh token 
//that will enter and will use this service
const refreshToken = async (token) => {
    const existingToken = await authRepository.findRefreshToken(token);

    if (!existingToken) {
        throw new AppError("Invalid refresh token", 401);
    }

    //if the end date of the expire for the token is already passed so we can not refresh
    //we will redirect it again but into the login page 
    if (existingToken.expiresAt < new Date()) {
        throw new AppError("Refresh token expired", 401);
    }

    //we will continue the logic if the refresh token already stored and not expired so that we can get the user if from it too cause we store it in the table

    //and then delete the old token cause we will make new one and will store it
    await authRepository.deleteRefreshToken(existingToken.id);

    const newRefreshToken = crypto.randomBytes(40).toString("hex");

    await authRepository.createRefreshToken({
        userId: existingToken.userId,
        token: newRefreshToken,
        expiresAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    });

    //but we didnot have the role of this user we just have its id so we need to get its user object to can make the new access token
    const user = await authRepository.findById(existingToken.userId);

    const newAccessToken = jwt.sign(
    {
      userId: user.id,
      role: user.role,
    },
    config.jwt.secret,
    {
      expiresIn: config.jwt.expiresIn,
    }
  );

  
//and then the last thing is to return the new access token and the new refresh token 
   return {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
  };

};

module.exports = {
    register,
    verifyEmail,
    resendVerification,
    login,
    refreshToken,
};