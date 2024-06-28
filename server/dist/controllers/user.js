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
exports.getFuncionarios = exports.loginUser = exports.newUser = void 0;
const paciente_1 = require("../models/paciente");
const funcionario_1 = require("../models/funcionario");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const newUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, primerApellido, segundoApellido, fechaNacimiento, numTelefono, idPaciente, email, direccion, password } = req.body;
    const user = yield paciente_1.Paciente.findOne({ where: { email: email } });
    if (user) {
        return res.status(400).json({
            msg: "Ya existe un usuario con este email"
        });
    }
    try {
        yield paciente_1.Paciente.create({
            nombre: nombre,
            primerApellido: primerApellido,
            segundoApellido: segundoApellido,
            fechaNacimiento: fechaNacimiento,
            idPaciente: idPaciente,
            direccion: direccion,
            email: email,
            numTelefono: numTelefono,
            password: password
        });
        res.json({
            msg: 'Usuario creado con exito',
        });
    }
    catch (error) {
        if (error instanceof Error) {
            console.error("Error al crear el usuario:", error.message);
            res.status(400).json({
                msg: "Error al crear el usuario",
                error: error.message // Ahora es seguro acceder a error.message
            });
        }
        else {
            console.error("Error desconocido al crear el usuario", error);
            res.status(500).json({
                msg: "Error desconocido al crear el usuario"
            });
        }
    }
});
exports.newUser = newUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    // Validamos que exista el usuario en pacientes o funcionarios
    const funcionario = yield funcionario_1.Funcionario.findOne({ where: { email: email } });
    const paciente = yield paciente_1.Paciente.findOne({ where: { email: email } });
    if (funcionario) {
        // Validamos la contraseña
        const tipo = 0;
        if (password !== funcionario.password) {
            console.log('La contraseña ingresada es incorrecta');
            return res.status(400).json({
                msg: "La contraseña ingresada es incorrecta"
            });
        }
        // Generar el token
        const token = jsonwebtoken_1.default.sign({ email: email,
            rut: funcionario.idFuncionarioSalud,
            nombre: funcionario.nombre,
            apellido: funcionario.primerApellido
        }, process.env.SECRET_KEY || 'HOLA123');
        res.json({ token, tipo });
    }
    else if (paciente) {
        // Validamos la contraseña
        const tipo = 1;
        if (password !== paciente.password) {
            console.log('La contraseña ingresada es incorrecta');
            return res.status(400).json({
                msg: "La contraseña ingresada es incorrecta"
            });
        }
        // Generar el token
        const token = jsonwebtoken_1.default.sign({
            email: email,
            rut: paciente.idPaciente,
            nombre: paciente.nombre,
            apellido: paciente.primerApellido
        }, process.env.SECRET_KEY || 'HOLA123');
        res.json({ token, tipo });
    }
    else {
        console.log('No existe un usuario con este email');
        return res.status(400).json({
            msg: "No existe un usuario con este email"
        });
    }
});
exports.loginUser = loginUser;
const getFuncionarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listFuncionarios = yield funcionario_1.Funcionario.findAll();
    res.json(listFuncionarios);
});
exports.getFuncionarios = getFuncionarios;
