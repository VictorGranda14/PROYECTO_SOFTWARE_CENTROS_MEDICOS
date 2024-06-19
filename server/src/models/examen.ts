import { DataTypes } from 'sequelize'
import db from '../db/connection';

const examen = db.define('examen', {
    idExamen: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    fecha: {
        type: DataTypes.DATE
    },
    rutaArchivo: {
        type: DataTypes.STRING
    },
    idPaciente:{
        type: DataTypes.STRING
    },
    idFuncionario: {
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

export default examen;