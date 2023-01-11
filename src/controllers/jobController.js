const jobModel = require("../models/job");
const userModel = require("../models/user");
const appliedJobModel = require("../models/applyJob");
const exportFunc = {
  createJob: async (req, res) => {
    try {
      let jobData = req.body;
      let { userId, email } = jobData;

      if (userId != req.userId) {
        return res.status(400).send({
          status: false,
          message: "You are not authorize to create this job with this user Id",
        });
      }
      let userFound = await userModel.findById(userId);
      if (userFound) {
        if (userFound.email == email) {
          let jobSavedData = await jobModel.create(jobData);
          return res.status(200).send({
            status: true,
            message: "New job created successfully!",
            jobDetails: jobSavedData,
          });
        } else {
          return res.status(400).send({
            status: false,
            message: "Email is incorrect!",
          });
        }
      } else {
        return res.status(400).send({
          status: false,
          message: "No job is created by this author Id!",
        });
      }
    } catch (error) {
      return res.status(500).send({ message: "Failed", error: error.message });
    }
  },
  filterJob: async (req, res) => {
    try {
      let jobQueryData = req.query;
      let { requiredSkills, experienceLevel } = jobQueryData;
      if (requiredSkills || experienceLevel) {
        jobQueryData.isDeleted = false;
        let filteredJobDetails = await jobModel.find(jobQueryData);
        if (!filteredJobDetails) {
          return res
            .status(404)
            .send({ status: false, message: "The given data is invalid!" });
        }
        return res.status(200).send({
          status: true,
          message: "Jobs fetched Successfully!",
          data: filteredJobDetails,
        });
      } else {
        return res.status(400).send({
          status: false,
          message: "Please provide query for this request",
        });
      }
    } catch (error) {
      return res.status(500).send({ message: "Failed", error: error.message });
    }
  },
  applyForJob: async (req, res) => {
    try {
      let { name, email, jobId } = req.body;
      let resume = req.files[0]["originalname"];
      let coverLetter = req.files[1]["originalname"];
      let jobFound = await jobModel.findById(jobId);
      if (jobFound) {
        let jobDetails = {
          name,
          email,
          jobId,
          resume,
          coverLetter,
          createdBy: jobFound.userId,
        };
        let jobsavedDetails = await appliedJobModel.create(jobDetails);
        return res.status(200).send({
          status: true,
          message: "You have applied for job successfully!",
          data: jobsavedDetails,
        });
      } else {
        return res
          .status(400)
          .send({ status: false, message: "No job found!" });
      }
    } catch (error) {
      return res.status(500).send({ message: "Failed", error: error.message });
    }
  },
  appliedJobList: async (req, res) => {
    try {
      let userId = req.params.userId;
      if (userId != req.userId) {
        return res.status(400).send({
          status: false,
          message: "You are not authorize to see this job with this user Id",
        });
      }
      let appliedJobData = await appliedJobModel.find({ createdBy: userId });
      if (appliedJobData) {
        return res.status(200).send({
          status: true,
          message: "Application found successfully!",
          data: appliedJobData,
        });
      } else {
        return res.status(400).send({
          status: false,
          message: "No application found!",
        });
      }
    } catch (error) {
      return res.status(500).send({ message: "Failed", error: error.message });
    }
  },
};

module.exports = exportFunc;
