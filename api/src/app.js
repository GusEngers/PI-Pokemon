const express = require('express');
const morgan = require('morgan');
require('dotenv').config();

const pokemon = require('./routes/pokemon');
const type = require('./routes/type');

const server = express();
server.name = 'API';
server.use(morgan('dev'));

const URL_APP = process.env.URL_APP || '*';
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', URL_APP);
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

server.use(express.json());
server.use('/pokemons', pokemon);
server.use('/types', type);

server.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
