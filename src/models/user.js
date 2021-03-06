// grab the things we need
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// create a schema
var userSchema = new Schema({
  _id: String,
  username: String,
  salt: String,
  hash: String,
  email: String,
  phone: Number,
  rollno: String,
  admin: Boolean,
  created_at: Date
});

// the schema is useless so far
// we need to create a model using it
var User = mongoose.model("User", userSchema);

// make this available to our users in our Node applications
module.exports = User;
