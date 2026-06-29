const multer = require("multer");
const path = require("path");
const fs = require("fs");

const resumesPath = path.join("uploads", "resumes");
if (!fs.existsSync(resumesPath)) {
    fs.mkdirSync(resumesPath, { recursive: true });
}

// Use memory storage for all files (profile picture and resume)
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    if (file.fieldname === "profilePicture" && file.mimetype.startsWith("image/")) {
        return cb(null, true);
    }
    if (file.fieldname === "resume" &&
        (file.mimetype === "application/pdf" ||
         file.mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document")) {
        return cb(null, true);
    }
    cb(new Error("Invalid file type"));
};

const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 },
});

module.exports = { upload };