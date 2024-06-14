"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const historiaClinica = connection_1.default.define('historiaClinica', {
    idHistoria: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true
    },
    nombrePaciente: {
        type: sequelize_1.DataTypes.STRING
    },
    fechaIngreso: {
        type: sequelize_1.DataTypes.DATE
    },
    descripcion: {
        type: sequelize_1.DataTypes.STRING
    },
    diagnostico: {
        type: sequelize_1.DataTypes.STRING
    },
    antecedentes: {
        type: sequelize_1.DataTypes.STRING
    },
    idPaciente: {
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
exports.default = historiaClinica;
