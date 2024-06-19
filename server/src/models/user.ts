import { DataTypes } from 'sequelize'
import db from '../db/connection';

export const User = db.define('pacientes', {
    idPaciente: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    nombrePaciente: {
        type: DataTypes.STRING,
        allowNull: false
    },
    apellidoPaciente: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    region: {
        type: DataTypes.STRING,
        allowNull: false
    },
    comuna: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.STRING, //'admin' o 'user'
        allowNull: false,
        defaultValue: 'user'
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