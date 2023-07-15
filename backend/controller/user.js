const express = require("express");
const path = require("path");
const router = express.Router();
const { upload } = require("../multer");
const User = require("../model/user");
const ErrorHandler = require("../utils/ErrorHandler");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail");
// const sendToken = require("../utils/jwtToken");

//const { JsonWebTokenError } = require("jsonwebtoken");
const fs = (require = require("fs"));

router.post("/create-user", upload.single("file"), async (req, res, next) => {
  try {
    const { name, email, password, avatar } = req.body;
    const userEmail = await User.findOne({ email });

    if (userEmail) {
      const filename = req.file.filename;

      const filePath = `uploads/${filename}`;

      fs.unlink(filePath, (err) => {
        if (err) {
          console.log(err);
          res.status(500).json({ message: "Error deletimng file" });
        } else {
          res.json({ message: "File Deleted successfully" });
        }
      });
      return next(new ErrorHandler("user already exists", 400));
    }

    // const filename = req.file.filename;
    // const fileUrl = path.join(filename);

    const user = {
      name: name,
      email: email,
      password: password,
      avatar: "fileUrl",
    };

    const activationToken = createActivationToken(user);
    const activationUrl = `http://localhost3000/activation/${activationToken}`;

    //send a mail
    try {
      await sendMail({
        email: user.email,
        subject: "Activate your account",
        message: `Hello ${user.name}, please click on the link to activate your account: ${activationUrl}`,
      })
      res.status(201).json({
        success: true,
        message: `please check your email:- ${user.email} to activate your account`,
      })
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

// console.log(user);

//create activation token
const createActivationToken = (user) => {
  return jwt.sign(user, process.env.ACTIVATION_SECRET, {
    expiresIn: "5m",
  });
};

//activate our user sending mail.
module.exports = router;
