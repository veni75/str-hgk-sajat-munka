const express = require("express");
const controller = require('./person.controller');

const router = express.Router();

// create
router.post('/', (req, res, next) => {
  return controller.create(req, res, next);
});

// read
router.get('/count', (req, res, next) => {
  return controller.findAllCount(req, res, next);
});

router.get('/vaccinated', (req, res, next) => {
    return controller.findAllVaccinated(req, res, next);
  });

router.get('/:id/vaccinated', (req, res, next) => {
  return controller.findOne(req, res, next);
});

// update
router.put('/:id/:vaccine', (req, res, next) => {
  return controller.update(req, res, next);
});

// delete
router.delete('/:vaccine', (req, res, next) => {
  return controller.delete(req, res, next);
});

module.exports = router;