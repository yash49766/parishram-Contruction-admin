const Contact = require("../models/Contact");

const contactForm = async (req, res) => {
    try {
        const { name, email, phone, subject, message } = req.body;

        if (!name || !email || !phone || !subject || !message) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const newContact = new Contact({ name, email, phone, subject, message });
        await newContact.save();

        return res.status(200).json({ message: "Message sent successfully" });
    } catch (error) {
        console.error("Error saving contact:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = { contactForm };
