import User from "@/models/userModels";
import nodemailer from "nodemailer";
import bcryptjs from 'bcryptjs'

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const hashedToken=await bcryptjs.hash(userId.toString(),10)

    if(emailType==="VERIFY"){
        await User.findByIdAndUpdate(userId,{verifyToken:hashedToken,verifyTokenExpire:Date.now()+3600000})
    }else if(emailType==="RESET"){
        await User.findByIdAndUpdate(userId,{forgotPasswordToken:hashedToken,forgotPasswordTokenExpire:Date.now()+3600000})
    }

    var transporter = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "ef5b4220152583",
          pass: "2bbeba3160fc03"
        }
      });

    const mailOptions = {
      from: "ujjwal@ujjwal.com", // sender address
      to: email, // list of receivers
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password", // Subject line
      html: `<p> Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a>
      to {emailType==="VERIFY"? "verify your email" : "reset your password"} or copy and paste the link in your browser
      <br>
      ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
      </p>`, // html body
    };
    const response = await transporter.sendMail(mailOptions);
    return response;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
