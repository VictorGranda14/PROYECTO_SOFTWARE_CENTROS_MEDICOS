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
exports.putHistoria = exports.postHistoria = exports.deleteHistoria = exports.getHistoria = exports.getHistorias = void 0;
const historiaClinica_1 = __importDefault(require("../models/historiaClinica"));
const getHistorias = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listHistorias = yield historiaClinica_1.default.findAll();
    res.json(listHistorias);
});
exports.getHistorias = getHistorias;
const getHistoria = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idHistoria } = req.params;
    const historia = yield historiaClinica_1.default.findByPk(idHistoria);
    if (historia) {
        res.json(historia);
    }
    else {
        res.status(404).json({
            msg: `No existe un producto con el id ${idHistoria}`
        });
    }
});
exports.getHistoria = getHistoria;
const deleteHistoria = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idHistoria } = req.params;
    const historia = yield historiaClinica_1.default.findByPk(idHistoria);
    if (!historia) {
        res.status(404).json({
            msg: `No existe un producto con el id ${idHistoria}`
        });
    }
    else {
        yield historia.destroy();
        res.json({
            msg: 'La historia fue eliminada con éxito'
        });
    }
});
exports.deleteHistoria = deleteHistoria;
const postHistoria = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        yield historiaClinica_1.default.create(body);
        res.json({
            msg: '¡El producto fue agregado con éxito!'
        });
    }
    catch (error) {
        console.log(error);
        res.json({
            msg: 'Ocurrió un error, comuníquese con soporte'
        });
    }
});
exports.postHistoria = postHistoria;
const putHistoria = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { idHistoria } = req.params;
    const historia = yield historiaClinica_1.default.findByPk(idHistoria);
    try {
        if (historia) {
            yield historia.update(body);
            res.json({
                msg: '¡La historia fue actualizada con éxito!'
            });
        }
        else {
            res.status(404).json({
                msg: `No existe un producto con el id ${idHistoria}`
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
exports.putHistoria = putHistoria;
