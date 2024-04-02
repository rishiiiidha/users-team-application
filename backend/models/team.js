const mongoose = require("mongoose");
const validator = require("validator");

const teamSchema = mongoose.Schema(
  {
    creater_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    group_name: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 50,
    },
    limit: {
        type: Number,
        required: true,
        min: 1,
        max: 100,
    }
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = teamSchema;
