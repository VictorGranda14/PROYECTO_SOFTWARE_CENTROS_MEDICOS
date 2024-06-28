"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const cita = connection_1.default.define('cita', {
    idCita: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true
    },
    hora: {
        type: sequelize_1.DataTypes.TIME
    },
    fecha: {
        type: sequelize_1.DataTypes.DATE
    },
    motivo: {
        type: sequelize_1.DataTypes.STRING
    },
    idPaciente: {
        type: sequelize_1.DataTypes.STRING
    },
    idFuncionarioSalud: {
        type: sequelize_1.DataTypes.STRING
    }
}, {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false,
    defaultScope: {
        attributes: { exclude: ['id'] }
    }
});
exports.default = cita;
