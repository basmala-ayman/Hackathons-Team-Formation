//now this services folder is for all the shared things that will be common on most of this  modules like sending the email can be used in notification and in auth
const nodemailer=require("nodemailer");
const config=require("../config/env");

const transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:config.email.user,
        pass:config.email.pass,
    },
});

//now lets write the function that will send the verification email
const sendVerificationEmail=async (email,token)=>{
    const verificationLink = `${config.baseUrl}/api/v1/auth/verify-email?token=${token}`;

    await transporter.sendMail({
        from: `"Team Catalyst 🔮 " <${config.email.user}>`,
    to: email,
    subject: "Verify your email",
    html: `
      <div style="font-family: Arial, sans-serif;">
        <h2>Welcome 🐣 </h2>
        <p>Thanks for registering. Please verify your email:</p>

        <a href="${verificationLink}" 
           style="display:inline-block;padding:10px 20px;
           background:#4CAF50;color:#fff;text-decoration:none;
           border-radius:5px">
          Verify Email
        </a>

        <p>If you did not create this account, ignore this email.</p>
      </div>
    `,
    });
};


//now lets making the function for sending email to reset password too in the same time to make the things more easier later
const sendResetPasswordEmail = async (email, token) => {
const resetLink = `${config.frontendUrl}/reset-password?token=${token}`;

  await transporter.sendMail({
    from: `"Team Catalyst 🔮" <${config.email.user}>`,
    to: email,
    subject: "Reset your password",
    html: `
      <p>Click below to reset your password:</p>
      <a href="${resetLink}">Reset Password</a>
    `,
  });
};

module.exports = {
  sendVerificationEmail,
  sendResetPasswordEmail,
};