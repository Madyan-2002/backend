const express = require('express');
const router = express.Router();
const productModel = require('../models/product.model');

router.get('/', async (req, res) => {
    const productList = await productModel.find();
    
});