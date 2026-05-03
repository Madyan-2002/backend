const express = require('express');
const router = express.Router();
const productModel = require('../models/product.model');


// Get all products
router.get('/', async (req, res) => {
    const productList = await productModel.find();

    if (!productList) {
        res.status(500).json({ success: false, message: "No products found" });
    } else {
        res.json(productList);
    }
});

// post a new product

router.post('/', async (req, res) => {
    const newProduct = new productModel({
        name: req.body.name,
        description: req.body.description,
        image: req.body.image,
        images: req.body.images,
        category: req.body.category,
        price: req.body.price,
        numberInStock: req.body.numberInStock,
    });

    newProduct.save()
        .then((product) => {
            res.status(201).json({ success: true, message: "Product created successfully", data: product });
        })
        .catch((error) => {
            res.status(500).json({ success: false, message: "Failed to create product", details: error.message });
        });

});

// delete a product by ID

router.delete('/:id', async (req, res) => {
    try {
        const deletedProduct = await productModel.findByIdAndDelete(req.params.id);

        if (!deletedProduct) {
            res.status(404).json({ success: false, message: "Product not found" });
        }
        else {
            res.status(200).json({ success: true, message: "Product deleted successfully", data: deletedProduct });
        }
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Failed to delete product", details: error.message });
    }
});

// update a product by ID
router.put('/:id', async (req, res) => {
    try {
        const updatedProduct = await productModel.findByIdAndUpdate(
            req.params.id,
            {
                name: req.body.name,
                description: req.body.description,
                image: req.body.image,
                images: req.body.images,
                category: req.body.category,
                price: req.body.price,
                numberInStock: req.body.numberInStock,
            },
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        res.status(200).json({
            success: true,
            data: updatedProduct
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Failed to update product", details: error.message });
    }
});

module.exports = router;