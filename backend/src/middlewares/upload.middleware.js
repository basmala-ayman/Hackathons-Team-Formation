const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Ensure upload folders exist
const createFolderIfNotExists = (folderPath) => {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }
};

const profilePicturesPath = path.join("uploads", "profile-pictures");
const resumesPath = path.join("uploads", "resumes");

createFolderIfNotExists(profilePicturesPath);
createFolderIfNotExists(resumesPath);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "profilePicture") {
      cb(null, profilePicturesPath);
    } else if (file.fieldname === "resume") {
      cb(null, resumesPath);
    } else {
      cb(new Error("Invalid upload field"));
    }
  },

  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() + "-" + Math.round(Math.random() * 1e9) + path.extname(file.originalname);

    cb(null, uniqueName);
  }
});

const fileFilter = (req, file, cb) => {
  // Allow only images for profile picture
  if (
    file.fieldname === "profilePicture" &&
    file.mimetype.startsWith("image/")
  ) {
    return cb(null, true);
  }

  // Allow PDF and DOCX for resume
  if (
    file.fieldname === "resume" &&
    (
      file.mimetype === "application/pdf" ||
      file.mimetype ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    )
  ) {
    return cb(null, true);
  }

  cb(new Error("Invalid file type"));
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB max
  }
});

module.exports = upload;