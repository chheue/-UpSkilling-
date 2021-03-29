const knex = require('knex');

const knexFile = require('../knexfile').development;

const db = knex(knexFile);

async function insertPublication(req) {
  return db('publications').insert(req)
    .then(() => ({ status: 201, message: 'Publication ajoutée' }))
    .catch((err) => ({ status: 400, message: err }));
}

async function getPublications() {
  return db('publications')
    .then((resp) => ({ status: 200, message: resp }))
    .catch((err) => ({ status: 400, message: err }));
}

async function getPublication(req) {
  // Concat all comments in Array of Object
  // return db('publications')
  // .leftJoin('comments', 'comments.publication_id', '=', 'publications.publication_id')
  // .where({ 'publications.publication_id': req })
  // const resultMap = resp.reduce((result, row) => {
  //   result[row.publication_id] = result[row.publication_id] || {
  //     publication_id: row.publication_id,
  //     title: row.title,
  //     content: row.content,
  //     author: row.author,
  //     creationDate: row.creationDate,
  //     comments: [],
  //   };
  //   result[row.publication_id].comments.push(
  //     {
  //       comment_id: row.comment_id,
  //       comment: row.comment,
  //       author: row.comment_author,
  //       creationDate: row.comment_creationDate,
  //     },
  //   );

  //   return result;
  // }, {});
  return db('publications').select().where({ publication_id: req })
    .then(async (resp) => ({ status: 200, message: resp[0] }))
    .catch((err) => ({ status: 400, message: err }));
}

async function commentPublication(id, body) {
  return db('comments').insert({ ...body, publication_id: id })
    .then(() => ({ status: 201, message: 'Commentaire ajouté' }))
    .catch((err) => ({ status: 400, message: err }));
}

async function getComments(req) {
  return db('comments').where({ publication_id: req })
    .then(async (resp) => ({ status: 200, message: resp }))
    .catch((err) => ({ status: 400, message: err }));
}

async function searchPublication(req) {
  return db('publications').where('title', 'like', `%${req}%`)
    .then(async (resp) => ({ status: 200, message: resp }))
    .catch((err) => ({ status: 400, message: err }));
}

async function deletePublication(req) {
  return db('publications').where({ publication_id: req }).del()
    .then(async (resp) => ({ status: 204, message: resp }))
    .catch((err) => ({ status: 400, message: err }));
}

module.exports = {
  insertPublication,
  getPublications,
  getPublication,
  commentPublication,
  getComments,
  searchPublication,
  deletePublication,
};
