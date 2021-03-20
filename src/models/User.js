const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  login: String,
  password: String,
  roles: [String],
});

module.exports = mongoose.model("User", UserSchema);
