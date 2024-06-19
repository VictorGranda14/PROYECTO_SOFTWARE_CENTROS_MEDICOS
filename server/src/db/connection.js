"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
var sequelize = new sequelize_1.Sequelize('bd_centros_medicos', 'root', 'ramimagna', {
    host: 'localhost',
    dialect: 'mysql'
});
exports.default = sequelize;
