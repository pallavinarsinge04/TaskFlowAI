const express = require("express");
const multer = require("multer");

const router = express.Router();

const {
  uploadFile,
} = require("../controllers/attachmentController");

const storage = multer.diskStorage({
  destination: "uploads/",

  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({
  storage,
});

router.post(
  "/",
  upload.single("file"),
  uploadFile
);

module.exports = router;