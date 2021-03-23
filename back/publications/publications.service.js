const knex = require('knex');

const knexFile = require('../knexfile').development;

const db = knex(knexFile);

async function insertPublication(req) {
  return db('publications').insert(req)
    .then(() => ({ status: 201, message: 'Publication ajoutée' }))
    .catch((err) => ({ status: 400, message: err }));
}

async function getPublications() {
  return db('publications').select()
    .then((resp) => ({ status: 200, message: resp }))
    .catch((err) => ({ status: 400, message: err }));
}

async function getPublication(req) {
  return db('publications').select().where({ id: req })
    .then((resp) => ({ status: 200, message: resp }))
    .catch((err) => ({ status: 400, message: err }));
}

module.exports = {
  insertPublication,
  getPublications,
  getPublication,
};
