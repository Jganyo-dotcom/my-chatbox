const {
  validateRegister,
  validatemessages,
  validateLoginUser,
} = require("../validations/chatapp");
const UserSchema = require("../models/chatapp.db");
const MessageSchema = require("../models/messaging");
const bcrypt = require("bcrypt");
const joi = require("joi");
const jwt = require("jsonwebtoken");
const { getIo } = require("../utils/socket");

const register = async (req, res) => {
  const { error, value } = validateRegister.validate(req.body);
  if (error) return res.status(401).json({ message: error.details[0].message });
  try {
    const existing_user = await UserSchema.findOne({ email: value.email });
    if (existing_user) {
      return res.status(400).json({ message: "email aleady exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashed_password = await bcrypt.hash(value.password, salt);

    const new_user = new UserSchema({
      name: value.name,
      email: value.email,
      password: hashed_password,
      role: "Guest",
    });

    await new_user.save();
    return res
      .status(201)
      .json({ message: "Your account has been created succcesfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json("something went wrong while creating your account");
  }
};

const loginUser = async (req, res) => {
  try {
    const { error, value } = validateLoginUser.validate(req.body);
    if (error)
      return res.status(401).json({ message: error.details[0].message });
    const existing_user = await UserSchema.findOne({ email: value.email });
    if (!existing_user) {
      return res.status(400).json({ message: "user does not exist" });
    }
    const comparePassword = await bcrypt.compare(
      value.password,
      existing_user.password
    );
    if (!comparePassword) {
      return res.status(401).json({ message: "invalid credentials" });
    }

    const token = jwt.sign(
      {
        id: existing_user._id,
        name: existing_user.name,
        email: existing_user.email,
        role: existing_user.role,
      },
      process.env.JWT_SECRETE,
      { expiresIn: process.env.EXPIRES_IN }
    );

    return res
      .status(200)
      .json({ message: "login was successful", user: existing_user, token });
  } catch (err) {
    console.log(err);
    res.status(500).json("something went wrong while creating your account");
  }
};

const messaging = async (req, res) => {
  try {
    const { error, value } = validatemessages.validate(req.body);
    if (error)
      return res.status(401).json({ message: error.details[0].message });

    const myMessage = new MessageSchema({
      sender: req.user.name,
      recipient: value.recipient,
      message: value.message,
    });
    const io = getIo();
    io.to(value.recipient.toString()).emit("sendMessage", myMessage);
    io.to(req.user.id.toString()).emit("sendMessage", myMessage);
  } catch (err) {
    console.log(err);
    return res.status(401).json({ message: "could not send message" });
  }
};

const allUsers = async (req, res) => {
  try {
    const all = await UserSchema.find({}).select("name email _id");
    return res.status(200).json({ message: "success", user: all });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "something went wrong" });
  }
};

module.exports = { register, loginUser, allUsers };
