const express = require('express');
const controller = require('../controllers');

const router = express.Router();

router.get('/', controller.salesController.getAll);

router.get('/:id', controller.salesController.listById);

router.delete('/:id', controller.salesController.deleteById);

router.put('/:id', controller.salesController.update);

router.post('/', controller.salesController.insert);

module.exports = router;