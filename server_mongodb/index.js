const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const routes = require('./routes/index.js');
const morgan = require('morgan');
const URL_MDB = process.env.URL_DB;
const PORT = process.env.PORT;

mongoose.connect(URL_MDB);

const cors = require('cors');
let corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
};

const database = mongoose.connection;
database.on('error', (error) => {
	console.log(error);
});
database.once('connected', () => {
	console.log('Database connected!');
});

const app = express();
app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(express.json());

app.use('/', routes);

app.listen(PORT, () => {
	console.log(`Server connected on port: ${PORT}`);
});
