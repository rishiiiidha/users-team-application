const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 100,
  },
  members: [
    {
      type: String,
    },
  ],
});

teamSchema.pre("save", function (next) {
  if (this.members.length > 6) {
    const err = new Error("Exceeded maximum number of members (6)");
    next(err);
  } else {
    next();
  }
});

const Team = mongoose.model("Team", teamSchema);

module.exports = Team;
