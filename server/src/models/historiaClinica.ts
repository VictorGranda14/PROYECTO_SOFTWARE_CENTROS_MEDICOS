import { DataTypes } from 'sequelize'
import db from '../db/connection';

const historiaClinica = db.define('historiaClinica', {
    idHistoria: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    nombrePaciente: {
        type: DataTypes.STRING
    },
    fechaIngreso: {
        type: DataTypes.DATE
    },
    descripcion: {
        type: DataTypes.STRING
    },
    diagnostico: {
        type: DataTypes.STRING
    },
    antecedentes: {
        type: DataTypes.STRING
    },
    idPaciente: {
        type: DataTypes.STRING
    }},
    {
        freezeTableName: true,
        createdAt: false,
        updatedAt: false,
        defaultScope: {
            attributes: { exclude: ['id'] }
        }
    }
);

export default historiaClinica;