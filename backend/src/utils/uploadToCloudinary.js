const cloudinary = require("../config/cloudinary");

const uploadToCloudinary = (buffer, folder = "profile-pictures") => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            { folder, resource_type: "image" },
            (error, result) => {
                if (error) return reject(error);
                resolve(result.secure_url); 
            }
        );
        stream.end(buffer);
    });
};

module.exports = uploadToCloudinary;