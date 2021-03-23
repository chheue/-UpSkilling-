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

router.post(
  '/insert',
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

module.exports = router;
