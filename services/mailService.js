const nodemailer = require('nodemailer');

const sendContactEmail = async ({ name, email, subject, message }) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail', // Use your email provider here
        auth: {
            user: process.env.EMAIL_USER, // Your email from .env
            pass: process.env.EMAIL_PASS, // Your email password from .env
        },
    });

    const mailOptions = {
        from: email,
        to: 'nexcodiainc@gmail.com', // The recipient's email
        subject: `Contact Us Form Submission: ${subject}`,
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    };

    await transporter.sendMail(mailOptions);
};

module.exports = { sendContactEmail };
