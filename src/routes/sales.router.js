const express = require('express');
const controller = require('../controllers');

const router = express.Router();

router.get('/', controller.salesController.getAll);

router.get('/:id', controller.salesController.listById);

router.delete('/:id', controller.salesController.deleteById);

module.exports = router;