const Contact = require("../models/Contact");

// Create contact
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

// Get all contacts
const getContacts = async (req, res) => {
    try {
        const contacts = await Contact.find();
        return res.status(200).json(contacts);
    } catch (error) {
        console.error("Error fetching contacts:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

// Delete a contact by ID
const deleteContact = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Contact.findByIdAndDelete(id);

        if (!deleted) {
            return res.status(404).json({ error: "Contact not found" });
        }

        return res.status(200).json({ message: "Contact deleted successfully" });
    } catch (error) {
        console.error("Error deleting contact:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

const updateContact = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, phone, subject, message } = req.body;

        const updatedContact = await Contact.findByIdAndUpdate(
            id,
            { name, email, phone, subject, message },
            { new: true, runValidators: true }
        );

        if (!updatedContact) {
            return res.status(404).json({ error: "Contact not found" });
        }

        return res.status(200).json({ message: "Contact updated successfully", contact: updatedContact });
    } catch (error) {
        console.error("Error updating contact:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};


module.exports = { contactForm, getContacts, deleteContact,updateContact  };
