const mongoose = require("mongoose");

const connection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("chatapp database connected");
  } catch (err) {
    console.log(err);
    console.log("something went wrong");
  }
};

module.exports = { connection };
