const express = require("express");
const path = require("path");
const router = express.Router();
const { upload } = require("../multer");
const User = require("../model/user");
const ErrorHandler = require("../utils/ErrorHandler");
const fs = (require = require("fs"));

router.post("/create-user", upload.single("file"), async (req, res, next) => {
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
  const user = {
    name: name,
    email: email,
    password: password,
    avatar: "fileUrl",
  };


const activationToken = createActivationToken(user);

  console.log(user);
  const newUser = await User.create(user);
  res.status(201).json({
    success: true,
    newUser,
  });
});

//create activation token


module.exports = router;
