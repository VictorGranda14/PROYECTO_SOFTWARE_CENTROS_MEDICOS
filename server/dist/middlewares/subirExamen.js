"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const crypto_1 = __importDefault(require("crypto"));
const path_1 = __importDefault(require("path"));
const sequelize_1 = require("sequelize");
const uuid = crypto_1.default.randomUUID();
const storage = multer_1.default.diskStorage({
    destination: path_1.default.join(__dirname, "../../public/uploads"),
    filename: function (req, file, cb) {
        cb(null, uuid + file.originalname.substring(file.originalname.lastIndexOf(".")));
    }
});
const fileFilter = (req, file, cb) => {
    const fileTypes = ['.pdf'];
    if (fileTypes.some((fileType) => fileType === file.mimetype)) {
        return (cb(null, true));
    }
    return cb(null, false);
};
const maxSize = 5 * 1024 * 1024;
const upload = (req, res, next) => {
    return (0, multer_1.default)({
        storage,
        limits: { fileSize: maxSize },
        fileFilter,
    }).single("archivo")(req, res, (err) => {
        if (err instanceof multer_1.default.MulterError) {
            return res.status(400).json({
                message: "El archivo es demasiado grande, solo se permite máximo 5MB"
            });
        }
        ;
        if (err)
            return res.status(400).json(err.message);
        if (!req.file) {
            res.status(400), (0, sequelize_1.json)({
                message: "No se ha subido ningún archivo, el único formato permitido es PDF"
            });
        }
        next();
    });
};
exports.upload = upload;
