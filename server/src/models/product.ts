import { DataTypes } from 'sequelize'
import db from '../db/connection';

export const Product = db.define('product', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.STRING
    }
},
    {
        freezeTableName: true,
        createdAt: false,
        updatedAt: false,
    }
);