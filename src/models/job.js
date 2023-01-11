const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;
let createdJobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
    },
    userId: {
      type: ObjectId,
      ref: "User Model",
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
    },
    requiredSkills: {
      type: [String],
      trim: true,
      required: true,
    },
    experienceLevel: {
      type: Number,
      trim: true,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      trim: true,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job Model", createdJobSchema);
