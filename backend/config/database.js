import { Sequelize } from 'sequelize';

const db = new Sequelize('digital_umkm', 'root', '', {
  host: 'https',
  dialect: 'mysql',
});

export default db;
