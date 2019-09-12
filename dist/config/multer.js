"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const multer = require("multer");
const path = require("path");
const crypto = require("crypto");
const multerS3 = require("multer-s3");
const aws = require("aws-sdk");
const destination = path.resolve(__dirname, "..", "..", "tmp");
const stoageEndpoint = new aws.Endpoint("sfo2.digitaloceanspaces.com");
const s3 = new aws.S3({
    // endpoint: stoageEndpoint,
    endpoint: "sfo2.digitaloceanspaces.com",
    // region: process.env.AWS_DEFAULT_REGION,
    accessKeyId: process.env.aws_access_key_id,
    secretAccessKey: process.env.aws_secret_access_key
});
const storageTypes = {
    local: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, destination);
        },
        filename: (req, file, cb) => {
            crypto.randomBytes(16, (err, hash) => {
                if (err)
                    cb(err, file.filename);
                file.filename = `${hash.toString("hex")}-${file.originalname}`;
                cb(null, file.filename);
            });
        }
    }),
    S3: multerS3({
        s3,
        bucket: "storageww",
        acl: "public-read",
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key: function (req, file, cb) {
            crypto.randomBytes(16, (err, hash) => {
                if (err)
                    cb(err);
                const fileName = `${hash.toString("hex")}-${file.originalname}`;
                cb(null, fileName);
            });
        }
    })
};
module.exports = {
    dest: destination,
    storage: storageTypes[process.env.UPLOAD_METHOD]
};
