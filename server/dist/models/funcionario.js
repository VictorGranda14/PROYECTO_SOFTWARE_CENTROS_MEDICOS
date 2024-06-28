"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Funcionario = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
exports.Funcionario = connection_1.default.define('funcionariosalud', {
    idFuncionarioSalud: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true,
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    primerApellido: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    segundoApellido: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    especialidad: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    numTelefono: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    }
}, {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false,
    defaultScope: {
        attributes: { exclude: ['id'] }
    }
});
