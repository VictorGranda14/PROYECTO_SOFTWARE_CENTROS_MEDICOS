import multer, { FileFilterCallback } from 'multer';
import path from 'path';
import fs from 'fs';
import { Request, Response, NextFunction } from 'express';

// Configuración del almacenamiento
const storage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb) => {
    const dir = path.join(__dirname, '../public/uploads');
    fs.mkdirSync(dir, { recursive: true }); // Crear el directorio si no existe
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

// Filtro de archivos para permitir solo PDFs
const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  const fileTypes = ['application/pdf'];

  if (fileTypes.includes(file.mimetype)) {
    return cb(null, true);
  }
  return cb(null, false);
};

// Límite de tamaño del archivo (5MB)
const maxSize = 5 * 1024 * 1024;

// Middleware de subida de archivos
export const upload = multer({ 
    storage,
    limits: { fileSize: maxSize },
    fileFilter,
  }).single('rutaArchivo');
