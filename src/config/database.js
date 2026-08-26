const { Sequelize } = require('sequelize');

// Sequelize lee las variables de entorno para construir la conexión.
// En local (Docker Compose) DB_SSL y DB_SCHEMA no se definen, así que
// se conecta sin SSL y usa el schema "public" por defecto.
// En Azure (PostgreSQL administrado) el workflow de GitHub Actions define
// DB_SSL=true y DB_SCHEMA=<nombre>, requerido por Azure y necesario para
// que las 3 APIs compartan un mismo servidor con schemas separados.
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    dialectOptions: process.env.DB_SSL === 'true'
      ? { ssl: { require: true, rejectUnauthorized: false } }
      : {},
    define: process.env.DB_SCHEMA
      ? { schema: process.env.DB_SCHEMA }
      : {},
    logging: false,
  }
);

module.exports = sequelize;
