const Joi = require("joi");
const exportValidationFunc = {
  registerUser: async (req, res, next) => {
    try {
      const userSchema = Joi.object().keys({
        fname: Joi.string().required(),
        lname: Joi.string().required(),
        title: Joi.string().required(),
        email: Joi.string().email().lowercase().required(),
        password: Joi.string().min(3).max(10).required(),
      });

      let value = await userSchema.validateAsync(req.body);
      req.body = value;
      next();
    } catch (error) {
      if (error.isJoi === true) {
        return res.status(422).send({
          status: "false",
          message: `ERROR-> ${error.message}`,
        });
      }
      return res.status(500).send({
        status: "false",
        message: `ERROR-> ${error.message}`,
      });
    }
  },
  loginUser: async (req, res, next) => {
    try {
      const loginUserSchema = Joi.object().keys({
        email: Joi.string().email().lowercase().required(),
        password: Joi.string().min(3).max(10).required(),
      });
      let value = await loginUserSchema.validateAsync(req.body);
      req.body = value;
      next();
    } catch (error) {
      if (error.isJoi === true) {
        return res.status(422).send({
          status: "false",
          message: `ERROR-> ${error.message}`,
        });
      }
      return res.status(500).send({
        status: "false",
        message: `ERROR-> ${error.message}`,
      });
    }
  },
  createJob: async (req, res, next) => {
    try {
      const createJobSchema = Joi.object().keys({
        title: Joi.string().required(),
        description: Joi.string().required(),
        userId: Joi.string().required(),
        email: Joi.string().email().lowercase().required(),
        requiredSkills: Joi.array()
          .items(Joi.string().lowercase())
          .max(5)
          .required(),
        experienceLevel: Joi.number().required(),
        isDeleted: Joi.boolean(),
      });
      let value = await createJobSchema.validateAsync(req.body);
      req.body = value;
      next();
    } catch (error) {
      if (error.isJoi === true) {
        return res.status(422).send({
          status: "false",
          message: `ERROR-> ${error.message}`,
        });
      }
      return res.status(500).send({
        status: "false",
        message: `ERROR-> ${error.message}`,
      });
    }
  },
  filterJob: async (req, res, next) => {
    try {
      const filterJobSchema = Joi.object().keys({
        requiredSkills: Joi.array().items(Joi.string()).max(5),
        experienceLevel: Joi.number(),
      });
      let value = await filterJobSchema.validateAsync(req.body);
      req.body = value;
      next();
    } catch (error) {
      if (error.isJoi === true) {
        return res.status(422).send({
          status: "false",
          message: `ERROR-> ${error.message}`,
        });
      }
      return res.status(500).send({
        status: "false",
        message: `ERROR-> ${error.message}`,
      });
    }
  },
  applyForJob: async (req, res, next) => {
    try {
      const appliedJobSchema = Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().email().lowercase().required(),
        jobId: Joi.string().required(),
      });
      let value = await appliedJobSchema.validateAsync(req.body);
      req.body = value;
      next();
    } catch (error) {
      if (error.isJoi === true) {
        return res.status(422).send({
          status: "false",
          message: `ERROR-> ${error.message}`,
        });
      }
      return res.status(500).send({
        status: "false",
        message: `ERROR-> ${error.message}`,
      });
    }
  },
};
module.exports = exportValidationFunc;
