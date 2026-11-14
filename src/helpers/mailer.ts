import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

export const sendEmail = async({email, emailType, userId}: any) => {
    try{
        const hashedToken = await bcryptjs.hash(userId.toString(), 10);

        if(emailType === "VERIFY"){
            await User.findByIdAndUpdate(userId, {
                verifyToken: hashedToken,
                verifyTokenExpiry: Date.now() + 3600000,
            });
        }
        else if(emailType === "RESET"){
            await User.findByIdAndUpdate(userId, {
                forgotPasswordToken: hashedToken,
                forgotPasswordTokenExpiry: Date.now() + 3600000,
            });
        }

        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: process.env.MAILTRAP_USER,
                pass: process.env.MAILTRAP_PASSWORD,
            }
        });
        const mailOptions = {
            from: "test@gmail.com",
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}.</p>`,
        };

        const mailresponse = await transport.sendMail(mailOptions);
        return mailresponse;
    }
    catch(error: any){
        throw new Error(error.message);
    }
}

/*
This code is a helper function that sends an email to a user, either to verify their email address or to reset their password
hashedToken hashes the user’s ID with bcrypt to create a unique-looking string. This string acts as the “key card.”
Save the token in the database
If VERIFY: stores verifyToken and verifyTokenExpiry on the user (valid for 1 hour: 3600000 ms).
If RESET: stores forgotPasswordToken and forgotPasswordTokenExpiry the same way.
Nodemailer is the “postman.” This configures it to send through Mailtrap, a fake SMTP inbox for development. Emails never reach real people; they land in your Mailtrap dashboard so you can test safely.
mailOptions sets the sender, recipient, subject and an HTML body containing a link like:
https://yourdomain.com/verifyemail?token=<hashedToken>
transport.sendMail(...) sends it, and the result is returned. Any error is caught and re-thrown
*/