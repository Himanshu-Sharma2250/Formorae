import Mailgen from "mailgen";
import nodemailer from "nodemailer"

interface optionType {
    email: string
    subject: string
    mailgenContent(): {
        body: {
            name: string,
            intro: string
            action: {
                instructions: string
                button: {
                    color: string
                    text: string
                    link: string
                }
            }
            outro: string
        }
    }
}

const sendEmail = async (options: any) => {
    // Initialize mailgen instance with default theme and brand configuration
    const mailGenerator = new Mailgen({
        theme: "default",
        product: {
        name: "FreeAPI",
        link: "https://freeapi.app",
        },
    });

    // For more info on how mailgen content work visit https://github.com/eladnava/mailgen#readme
    // Generate the plaintext version of the e-mail (for clients that do not support HTML)
    const emailTextual = mailGenerator.generatePlaintext(options.mailgenContent);

    // Generate an HTML email with the provided contents
    const emailHtml = mailGenerator.generate(options.mailgenContent);

    // Create a nodemailer transporter instance which is responsible to send a mail
    const transporter = nodemailer.createTransport({
        host: process.env.MAILTRAP_SMTP_HOST,
        port: process.env.MAILTRAP_SMTP_PORT,
        auth: {
            user: process.env.MAILTRAP_SMTP_USER,
            pass: process.env.MAILTRAP_SMTP_PASS,
        },
    } as any);

    const mail = {
        from: "mail.freeapi@gmail.com", // We can name this anything. The mail will go to your Mailtrap inbox
        to: options.email, // receiver's mail
        subject: options.subject, // mail subject
        text: emailTextual, // mailgen content textual variant
        html: emailHtml, // mailgen content html variant
    };

    try {
        await transporter.sendMail(mail);
    } catch (error) {
        console.error("Error sending email: ", error);
    }
};

const emailVerificationMailgenContent = (name: string, verificationUrl: string) => {
    return {
        body: {
        name: name,
        intro: "Welcome to our app! We're very excited to have you on board.",
        action: {
            instructions:
            "To verify your email please click on the following button:",
            button: {
                color: "#22BC66", // Optional action button color
                text: "Verify your email",
                link: verificationUrl,
            },
        },
        outro:
            "Need help, or have questions? Just reply to this email, we'd love to help.",
        },
    };
};

const forgotPasswordMailgenContent = (name: string, passwordResetUrl: string) => {
    return {
        body: {
        name: name,
        intro: "We got a request to reset the password of our account",
        action: {
            instructions:
            "To reset your password click on the following button or link:",
            button: {
            color: "#22BC66", // Optional action button color
            text: "Reset password",
            link: passwordResetUrl,
            },
        },
        outro:
            "Need help, or have questions? Just reply to this email, we'd love to help.",
        },
    };
};

export {
  sendEmail,
  emailVerificationMailgenContent,
  forgotPasswordMailgenContent,
};