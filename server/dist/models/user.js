"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
exports.User = connection_1.default.define('usuario', {
    idPaciente: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true,
    },
    nombrePaciente: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    apellidoPaciente: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    region: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    comuna: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: sequelize_1.DataTypes.STRING, //'admin' o 'user'
        allowNull: false,
        defaultValue: 'user'
    }
}, {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false,
    defaultScope: {
        attributes: { exclude: ['id'] }
    }
});
