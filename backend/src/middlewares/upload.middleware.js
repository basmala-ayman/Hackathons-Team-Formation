const multer = require("multer");
const path = require("path");
const fs = require("fs");

const resumesPath = path.join("uploads", "resumes");
if (!fs.existsSync(resumesPath)) {
    fs.mkdirSync(resumesPath, { recursive: true });
}

const diskStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, resumesPath);
    },
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9) + path.extname(file.originalname);
        cb(null, uniqueName);
    },
});

const memoryStorage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    if (file.fieldname === "profilePicture" && file.mimetype.startsWith("image/")) {
        return cb(null, true);
    }
    if (
        file.fieldname === "resume" &&
        (file.mimetype === "application/pdf" ||
            file.mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document")
    ) {
        return cb(null, true);
    }
    cb(new Error("Invalid file type"));
};

const uploadProfilePicture = multer({
    storage: memoryStorage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 },
});

const uploadResume = multer({
    storage: diskStorage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 },
});

module.exports = { uploadProfilePicture, uploadResume };