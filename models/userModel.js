const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  name: { type: String, required: true },
  lastName: String,
  age: Number
});
module.exports = mongoose.model("userCollection", userSchema);