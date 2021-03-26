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
    .then(async (resp) => ({ status: 200, message: resp[0] }))
    .catch((err) => ({ status: 400, message: err }));
}

async function commentPublication(id, body) {
  return db('comments').insert({ ...body, publication_id: id })
    .then((resp) => ({ status: 200, message: resp }))
    .catch((err) => ({ status: 400, message: err }));
}

async function getComments(req) {
  return db('comments').select().where({ publication_id: req })
    .then(async (resp) => ({ status: 200, message: resp }))
    .catch((err) => ({ status: 400, message: err }));
}

async function searchPublication(req) {
  return db('publications').select().where('title', 'like', `%${req}%`)
    .then(async (resp) => ({ status: 200, message: resp }))
    .catch((err) => ({ status: 400, message: err }));
}

module.exports = {
  insertPublication,
  getPublications,
  getPublication,
  commentPublication,
  getComments,
  searchPublication,
};
