const express = require('express');
const { body, param, validationResult } = require('express-validator');
const publicationsService = require('./publications.service');

const router = express.Router();

function insertPublication(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  return publicationsService
    .insertPublication(req.body)
    .then((response) => res.status(response.status).json(response.message))
    .catch((err) => next(err));
}

function getPublications(req, res, next) {
  return publicationsService.getPublications()
    .then((response) => res.status(response.status).json(response.message))
    .catch((err) => next(err));
}

function getPublication(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  return publicationsService
    .getPublication(req.params.id)
    .then((response) => res.status(response.status).json(response.message))
    .catch((err) => next(err));
}

function commentPublication(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  return publicationsService
    .commentPublication(req.params.id, req.body)
    .then((response) => res.status(response.status).json(response.message))
    .catch((err) => next(err));
}

function getComments(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  return publicationsService
    .getComments(req.params.id)
    .then((response) => {
      res.status(response.status).json(response.message);
    })
    .catch((err) => next(err));
}

function searchPublication(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  return publicationsService
    .searchPublication(req.body.title)
    .then((response) => {
      res.status(response.status).json(response.message);
    })
    .catch((err) => next(err));
}

function deletePublication(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  return publicationsService
    .deletePublication(req.params.id)
    .then((response) => {
      res.status(response.status).json(response.message);
    })
    .catch((err) => next(err));
}

router.post(
  '/',
  body('title').isLength({ min: 3 }),
  body('content').isLength({ min: 3 }),
  body('author').isLength({ min: 3 }),
  insertPublication,
);
router.get('/', getPublications);
router.get(
  '/:id',
  param('id').notEmpty(),
  getPublication,
);
router.put('/:id',
  body('author').isLength({ min: 3 }),
  body('comment').isLength({ min: 3 }),
  commentPublication);
router.get('/comments/:id',
  param('id').notEmpty(),
  getComments);
router.post('/search',
  body('title').isLength({ min: 3 }),
  searchPublication);
router.delete('/:id',
  param('id').notEmpty(),
  deletePublication);
module.exports = router;
