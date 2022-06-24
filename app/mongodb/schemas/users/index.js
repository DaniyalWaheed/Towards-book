const mongoose = require("mongoose");
const validator = require("validator");

const UsersSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
      unique: true,
      index: true,
      required: [true, "Username is required"],
    },
    email: {
      type: String,
      index: true,
      required: [true, "Email is required"],
      validate: {
        validator: function (value) {
          return validator.isEmail(value);
        },
        message: ({ value }) => `${value} is not a valid email`,
      },
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

module.exports = UsersSchema;
