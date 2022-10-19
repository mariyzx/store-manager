const express = require('express');
const productsController = require('../controllers');
const validateNewProductFields = require('../middlewares/validateNewProductFields');

const router = express.Router();

router.get('/', productsController.productsController.listProducts);

router.get('/search', productsController.productsController.findByQuery);

router.get('/:id', productsController.productsController.listById);

router.post('/', validateNewProductFields, productsController.productsController.createProduct);

router.delete('/:id', productsController.productsController.deleteById);

router.put('/:id', validateNewProductFields, productsController.productsController.update);

module.exports = router;