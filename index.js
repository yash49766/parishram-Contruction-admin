const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");


const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const contactRoutes = require("./routes/contactRoutes");

app.use("/api", contactRoutes);

// MongoDB Connection
mongoose
    .connect("mongodb+srv://yashkapadiya191:DFN5hii4KjeZVuvw@cluster0.exvvwph.mongodb.net/", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB error:", err));

// Server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
