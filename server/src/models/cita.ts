import { DataTypes } from 'sequelize'
import db from '../db/connection';

const cita = db.define('cita', {
    idCita: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    hora:{
        type:DataTypes.TIME
    },
    fecha: {
        type: DataTypes.DATE
    },
    motivo: {
        type: DataTypes.STRING
    },
    idPaciente:{
        type: DataTypes.STRING
    },
    idFuncionarioSalud: {
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

export default cita;