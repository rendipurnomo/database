import { Sequelize } from 'sequelize';

const db = new Sequelize('digital_umkm', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

export default db;
