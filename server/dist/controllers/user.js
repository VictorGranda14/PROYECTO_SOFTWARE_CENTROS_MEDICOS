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
exports.loginUser = exports.newUser = void 0;
const user_1 = require("../models/user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const newUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombrePaciente, apellidoPaciente, idPaciente, email, region, comuna, password, role } = req.body;
    const user = yield user_1.User.findOne({ where: { email: email } });
    if (user) {
        return res.status(400).json({
            msg: "Ya existe un usuario con este email"
        });
    }
    try {
        yield user_1.User.create({
            nombrePaciente: nombrePaciente,
            apellidoPaciente: apellidoPaciente,
            idPaciente: idPaciente,
            region: region,
            comuna: comuna,
            email: email,
            password: password,
            role: role
        });
        res.json({
            msg: 'Usuario creado con exito',
        });
    }
    catch (error) {
        res.status(400).json({
            msg: "Error al crear el usuario",
            error
        });
    }
});
exports.newUser = newUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    // Log para verificar los datos recibidos
    console.log(`Datos recibidos: email=${email}, password=${password}`);
    // Validamos que exista el usuario
    const user = yield user_1.User.findOne({ where: { email: email } });
    if (!user) {
        console.log('No existe un usuario con este email');
        return res.status(400).json({
            msg: "No existe un usuario con este email"
        });
    }
    // Validamos la contraseña
    if (password !== user.password) {
        console.log('La contraseña ingresada es incorrecta');
        return res.status(400).json({
            msg: "La contraseña ingresada es incorrecta"
        });
    }
    // Generar el token
    const token = jsonwebtoken_1.default.sign({ email: email, role: user.role }, process.env.SECRET_KEY || 'HOLA123');
    res.json({ token });
});
exports.loginUser = loginUser;
