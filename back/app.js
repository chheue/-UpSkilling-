/* eslint-disable no-console */

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
// const knex = require('knex');

// const knexFile = require('./knexfile').development;

// const db = knex(knexFile);

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));

app.get('/', (req, res) => res.send('API Upskilling'));
app.use('/publication', require('./publications/publications.controller'));

app.listen(port, () => {
  console.log(`Serveur en cours sur le port ${port} `);
});
