"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
// Configuración del almacenamiento
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        const dir = path_1.default.join(__dirname, '../public/uploads');
        fs_1.default.mkdirSync(dir, { recursive: true }); // Crear el directorio si no existe
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});
// Filtro de archivos para permitir solo PDFs
const fileFilter = (req, file, cb) => {
    const fileTypes = ['application/pdf'];
    if (fileTypes.includes(file.mimetype)) {
        return cb(null, true);
    }
    return cb(null, false);
};
// Límite de tamaño del archivo (5MB)
const maxSize = 5 * 1024 * 1024;
// Middleware de subida de archivos
exports.upload = (0, multer_1.default)({
    storage,
    limits: { fileSize: maxSize },
    fileFilter,
}).single('rutaArchivo');
