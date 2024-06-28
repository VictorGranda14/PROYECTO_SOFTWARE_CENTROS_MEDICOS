import { DataTypes } from 'sequelize'
import db from '../db/connection';

export const Paciente = db.define('paciente', {
    idPaciente: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    primerApellido: {
        type: DataTypes.STRING,
        allowNull: false
    },
    segundoApellido: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    fechaNacimiento: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    direccion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    numTelefono: {
        type: DataTypes.STRING,
        allowNull: false        
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
},  {
        freezeTableName: true,
        createdAt: false,
        updatedAt: false,
        defaultScope: {
            attributes: { exclude: ['id'] }
        }
    }
);