require('dotenv').config();

const app       = require('./src/app');
const sequelize = require('./src/config/database');

const PORT = process.env.PORT || 3000;

async function iniciar() {
  try {
    await sequelize.authenticate();
    console.log('Conexión a la base de datos establecida.');

    await sequelize.sync({ alter: true });
    console.log('Modelos sincronizados con la base de datos.');

    app.listen(PORT, () => {
      console.log(`API de Cliente corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Error al iniciar la aplicación:', error.message);
    process.exit(1);
  }
}

iniciar();
