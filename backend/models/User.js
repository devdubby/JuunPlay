const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const autoIncrement = require("mongoose-auto-increment");
const crypto = require("crypto");
const config = require("../config/keys");

const User = new Schema({
  name: String,
  email: String,
  password: String
});

// create new User document
User.statics.create = function(name, email, password) {
  const encrypted = crypto
    .createHmac("sha1", config.secret)
    .update(password)
    .digest("base64");

  const user = new this({
    name,
    email,
    password: encrypted
  });

  return user.save();
};

User.statics.findOneByEmail = function(email) {
  return this.findOne({
    email
  }).exec();
};

User.methods.verify = function(password) {
  const encrypted = crypto
    .createHmac("sha1", config.secret)
    .update(password)
    .digest("base64");

  return this.password === encrypted;
};

autoIncrement.initialize(mongoose.connection);
User.plugin(autoIncrement.plugin, {
  model: "User",
  field: "id",
  startAt: 1000
});
module.exports = mongoose.model("User", User);
