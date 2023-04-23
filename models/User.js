const mongoose = require("mongoose");
const validator = require('validator');
const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      validate: {
        validator: function(v) {
          return regex.test(v);
        },
        message:  ' You must enter a valid email!'
      },
    },
    password: {
        type: String,
        required: true,
        validate: {
          validator: function(v) {
            return v.length >= 8;
          },
          message: 'Password must contain 8 characters'
        },
      },
      favorites:[{"title": String }]
      },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", UserSchema);