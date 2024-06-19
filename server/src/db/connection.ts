import { Sequelize } from 'sequelize'

const sequelize = new Sequelize('bd_centros_medicos', 'root', 'ramimagna', {
    host: 'localhost',
    dialect:'mysql'
  });

export default sequelize;