const db = require('../../config/db')
const bcrypt = require('bcryptjs');
const { connect, Schema, model } = require('mongoose');

const UserSchema = new Schema({
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true }
  });
  
  const UserModel = model("users", UserSchema);

  module.exports = UserModel;
