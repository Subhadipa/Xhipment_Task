const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;
let appliedJobSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
    },
    jobId: {
      type: ObjectId,
      ref: "Job Model",
      required: true,
    },
    resume: {
      type: String,
      trim: true,
      required: true,
    },
    coverLetter: {
      type: String,
      trim: true,
      required: true,
    },
    createdBy: {
      type: ObjectId,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Apply Job Model", appliedJobSchema);
