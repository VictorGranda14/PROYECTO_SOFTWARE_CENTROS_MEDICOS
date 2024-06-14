import { Sequelize } from 'sequelize'

const sequelize = new Sequelize('bd_centros_medicos', 'root', 'Raul1104!', {
    host: 'localhost',
    dialect:'mysql'
  });

export default sequelize;