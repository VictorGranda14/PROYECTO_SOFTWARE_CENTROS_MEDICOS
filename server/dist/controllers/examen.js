"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.putExamen = exports.postExamen = exports.deleteExamen = exports.getExamen = exports.getExamenes = void 0;
const examen_1 = __importDefault(require("../models/examen"));
const getExamenes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listExamenes = yield examen_1.default.findAll();
    res.json(listExamenes);
});
exports.getExamenes = getExamenes;
const getExamen = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idExamen } = req.params;
    const examen = yield examen_1.default.findByPk(idExamen);
    if (examen) {
        res.json(examen);
    }
    else {
        res.status(404).json({
            msg: `No existe un examen con id ${idExamen}`
        });
    }
});
exports.getExamen = getExamen;
const deleteExamen = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idExamen } = req.params;
    try {
        const examen = yield examen_1.default.findByPk(idExamen);
        if (!examen) {
            res.status(404).json({
                msg: `No existe examen con id ${idExamen}`
            });
        }
        else {
            yield examen.destroy();
            res.json({
                msg: 'Examen eliminado con éxito'
            });
        }
    }
    catch (error) {
        res.status(500).json({
            msg: 'Error al eliminar el examen',
            error
        });
    }
});
exports.deleteExamen = deleteExamen;
const postExamen = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { fecha, idPaciente, idFuncionario } = req.body;
    const rutaArchivo = (_a = req.file) === null || _a === void 0 ? void 0 : _a.filename;
    try {
        const examen = yield examen_1.default.create({ fecha, rutaArchivo, idPaciente, idFuncionario });
        res.json({
            message: '¡Examen subido con éxito!',
            examen
        });
    }
    catch (error) {
        res.status(500).json({
            msg: 'Error al crear el examen',
            error
        });
    }
});
exports.postExamen = postExamen;
const putExamen = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const { idExamen } = req.params;
    const { fecha, idPaciente, idFuncionario } = req.body;
    const rutaArchivo = (_b = req.file) === null || _b === void 0 ? void 0 : _b.filename;
    try {
        const examen = yield examen_1.default.findByPk(idExamen);
        if (examen) {
            yield examen.update({ fecha, rutaArchivo, idPaciente, idFuncionario });
            res.json({
                msg: '¡Examen actualizado con éxito!'
            });
        }
        else {
            res.status(404).json({
                msg: `No existe examen con id ${idExamen}`
            });
        }
    }
    catch (error) {
        console.log(error);
        res.json({
            msg: 'Ocurrió un error, comuníquese con soporte'
        });
    }
});
exports.putExamen = putExamen;
