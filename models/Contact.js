const mongoose = require("mongoose");
let contactSchema = new mongoose.Schema(
    {
        name: { type: String },
        phone: { type: String },
        email: { type: String },
        message: { type: String }
    }

);

module.exports = mongoose.model("Contact", contactSchema);