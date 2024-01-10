const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// DB Config
require('./database/config').dbConnection();

// App de Express
const app = express();

// Lectura y parseo del body
app.use(express.json());

// Uso de cors
app.use(cors());

// Node Server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/socket');

// Path público
const publicPath = path.resolve(__dirname, 'public');
app.use(express.static(publicPath));

// Mis Rutas
app.use('/api/login', require('./routes/auth'));

app.use('/api/notas', require('./routes/notas'));

const port = process.env.PORT || 3000;
server.listen(port, (err) => {
  if (err) throw new Error(err);

  console.log('Servidor corriendo en puerto', port);
});
