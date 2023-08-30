const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
const path = require("path");
const {
  CLOUD_NAME,
  CLOUDINARY_KEY,
  CLOUDINARY_SECRET,
} = require("../helpers/env");

// const storage = multer.diskStorage({
//   destination: path.join(process.cwd(), "upload"),
//   filename: (req, file, cb) => {
//     const randomNumber = Math.round(Math.random() * 90000);
//     const filename = `${randomNumber}${Date.now()}${path.extname(
//       file.originalname
//     )}`;
//     cb(null, filename);
//   },
// });

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: CLOUDINARY_KEY,
  api_secret: CLOUDINARY_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "pos-uploads",
    format: async (req, file) => path.extname(file.originalname).slice("1"), // supports promises as well
    public_id: () => {
      const randomNumber = Math.round(Math.random() * 90000);
      const filename = `${randomNumber}${Date.now()}`;

      return filename;
    },
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
  fileFilter: (req, file, callback) => {
    const ext = path.extname(file.originalname);
    if (ext !== ".png" && ext !== ".jpg" && ext !== ".jpeg") {
      return callback(new Error("Only images are allowed"));
    }
    callback(null, true);
  },
});

const uploadErrorHandler = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      res.status(400).json({
        success: false,
        message: "File size exceeded 2MB limit",
      });
    } else {
      res.status(400).json({
        success: false,
        message: err.message,
      });
    }
  } else {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
  next()
};

module.exports = {
  upload,
  uploadErrorHandler,
  cloudinary,
};
