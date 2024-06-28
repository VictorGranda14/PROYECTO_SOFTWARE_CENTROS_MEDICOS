import { DataTypes } from 'sequelize'
import db from '../db/connection';

export const Funcionario = db.define('funcionariosalud', {
    idFuncionarioSalud: {
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
    especialidad: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    numTelefono: {
        type: DataTypes.STRING,
        allowNull: false,
    }
},  {
        freezeTableName: true,
        createdAt: false,
        updatedAt: false,
        defaultScope: {
            attributes: { exclude: ['id'] }
        }
    }
);