const express = require('express');
const app = express();

app.use(express.json());

// CORS: necesario para que el cliente HTML (bono) pueda llamar a la API desde el navegador
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

// Rutas
const clienteRoutes = require('./routes/clienteRoutes');
app.use('/clientes', clienteRoutes);

module.exports = app;
