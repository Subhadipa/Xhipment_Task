const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const exportFunc = {
  registerUser: async (req, res) => {
    try {
      let userData = req.body,
        saltRounds = 10;
      let { fname, lname, title, email, password } = userData;

      let hasedPassword = await bcrypt.hash(password, saltRounds);
      userData.password = hasedPassword;

      let userSavedData = await userModel.create(userData);
      return res.send({
        status: true,
        message: "New user registered successfully!",
        UserDetails: userSavedData,
      });
    } catch (error) {
      return res.status(500).send({ message: "Failed", error: error.message });
    }
  },
  loginUser: async (req, res) => {
    try {
      let { email, password } = req.body;

      let userDataCheck = await userModel.findOne({ email: email });
      if (userDataCheck) {
        let decryptedPassword = await bcrypt.compare(
          password,
          userDataCheck.password
        );
        if (decryptedPassword == true) {
          let generatedToken = jwt.sign({ userId: userDataCheck._id }, "subha");
          return res.send({
            Message:userDataCheck.fname +" " +userDataCheck.lname +" logged in Succesfully!",
            userId: userDataCheck._id,
            token: generatedToken,
          });
        } else {
          return res
            .status(400)
            .send({ status: false, message: "Invalid login credentials!" });
        }
      } else {
        return res
          .status(400)
          .send({ status: false, message: "Invalid login credentials!" });
      }
    } catch (error) {
      return res.status(500).send({ status: false, message: error.message });
    }
  },
};

module.exports = exportFunc;
