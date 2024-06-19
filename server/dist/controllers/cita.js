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
exports.putCita = exports.postCita = exports.deleteCita = exports.getCita = exports.getCitas = void 0;
const cita_1 = __importDefault(require("../models/cita"));
const getCitas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listCitas = yield cita_1.default.findAll();
    res.json(listCitas);
});
exports.getCitas = getCitas;
const getCita = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idCita } = req.params;
    const citaBuscada = yield cita_1.default.findByPk(idCita);
    if (citaBuscada) {
        res.json(citaBuscada);
    }
    else {
        res.status(404).json({
            msg: `No existe cita con id ${idCita}`
        });
    }
});
exports.getCita = getCita;
const deleteCita = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idCita } = req.params;
    const citaBuscada = yield cita_1.default.findByPk(idCita);
    if (!citaBuscada) {
        res.status(404).json({
            msg: `No existe cita con id ${idCita}`
        });
    }
    else {
        yield citaBuscada.destroy();
        res.json({
            msg: 'La cita fue eliminada con éxito'
        });
    }
});
exports.deleteCita = deleteCita;
const postCita = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        yield cita_1.default.create(body);
        res.json({
            msg: '¡La cita fue agregada con éxito!'
        });
    }
    catch (error) {
        if (error.name === 'SequelizeForeignKeyConstraintError') {
            res.status(400).json({
                msg: 'El RUT ingresado no existe. Por favor, ingrese un RUT válido.',
                error
            });
        }
        else {
            res.status(500).json({
                msg: 'Error al crear la cita',
                error
            });
        }
    }
});
exports.postCita = postCita;
const putCita = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { idCita } = req.params;
    const citaBuscada = yield cita_1.default.findByPk(idCita);
    try {
        if (citaBuscada) {
            yield citaBuscada.update(body);
            res.json({
                msg: '¡La cita fue actualizada con éxito!'
            });
        }
        else {
            res.status(404).json({
                msg: `No existe cita con id ${idCita}`
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
exports.putCita = putCita;
