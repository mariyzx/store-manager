const express = require('express');
const productsController = require('../controllers');
const validateNewProductFields = require('../middlewares/validateNewProductFields');

const router = express.Router();

router.get('/', productsController.productsController.listProducts);

router.get('/:id', productsController.productsController.listById);

router.post('/', validateNewProductFields, productsController.productsController.createProduct);

router.delete('/:id', productsController.productsController.deleteById);

module.exports = router;