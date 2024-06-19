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
const connection_1 = __importDefault(require("./connection"));
const queryInterface = connection_1.default.getQueryInterface();
function updatePacientesTable() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Eliminar las columnas 'fechaIngreso' y 'id'
            yield queryInterface.removeColumn('pacientes', 'fechaIngreso');
            yield queryInterface.removeColumn('pacientes', 'id');
            // Agregar la columna 'idPaciente'
            yield queryInterface.addColumn('pacientes', 'idPaciente', {
                type: 'INTEGER',
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            });
            console.log('Tabla pacientes actualizada exitosamente.');
        }
        catch (error) {
            console.error('Error al actualizar la tabla pacientes:', error);
        }
        finally {
            yield connection_1.default.close();
        }
    });
}
updatePacientesTable();
