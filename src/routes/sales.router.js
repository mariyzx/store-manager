const express = require('express');
const controller = require('../controllers');

const router = express.Router();

router.get('/', controller.salesController.getAll);

router.get('/:id', controller.salesController.listById);

module.exports = router;