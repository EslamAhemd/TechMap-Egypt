const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    maxlength: 50,
  },
  category: {
    type: String,
    trim: true,
  }
}, { timestamps: true });

const skillModel = mongoose.model("skills", skillSchema);

module.exports = { skillModel };