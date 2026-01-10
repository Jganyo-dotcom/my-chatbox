const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, minlength: 5, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, minlength: 6, required: true },
    role: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Users", UserSchema);
