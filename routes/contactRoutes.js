const express = require("express");
const router = express.Router();
const { contactForm, getContacts, deleteContact } = require("../controllers/contactController");

// POST - Create new contact
router.post("/", contactForm);

// GET - Fetch all contacts
router.get("/all", getContacts);

// DELETE - Delete contact by ID
router.delete("/:id", deleteContact);

module.exports = router;
