const { sendContactEmail } = require('../services/mailService');

const contactFormHandler = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;
        await sendContactEmail({ name, email, subject, message });
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Failed to send email' });
    }
};

module.exports = { contactFormHandler };
