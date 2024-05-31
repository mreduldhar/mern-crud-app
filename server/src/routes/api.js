const express = require('express');
const productController= require('../controller/productController')
const router = express.Router();

// API routing endpoint

// C=Create
router.post('/create-product', productController.createProduct)

// R=Read
router.get('/read-product', productController.readProduct)

// R=ReadById
router.get('/read-product-by-id/:id', productController.readProductById)

// U=Update
router.post('/update-product/:id', productController.updateProduct)

// D=Delete
router.delete('/delete-product/:id', productController.deleteProduct)



module.exports = router;

