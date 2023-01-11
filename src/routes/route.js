const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const jobController = require("../controllers/jobController");
const validator = require("../middleware/validation");
const authentication = require("../middleware/authentication");

router.post("/registerUser",validator.registerUser,userController.registerUser);
router.post("/loginUser", validator.loginUser, userController.loginUser);
router.post("/createJob",validator.createJob,authentication.authenticate,jobController.createJob);
router.get("/filterJob", validator.filterJob, jobController.filterJob);
router.post("/applyJob", validator.applyForJob, jobController.applyForJob);
router.get("/getJob/:userId",authentication.authenticate,jobController.appliedJobList);

module.exports = router;
