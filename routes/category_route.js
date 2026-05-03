const express = require('express');
const router = express.Router();

const categoryModel = require('../models/category.model');

// Get all categories
router.get('/', async (req, res) => {

    const categoryList = await categoryModel.find();

    if (!categoryList) {
        res.status(500).json({ success: false, message: "No categories found" });
    } else {
        res.json(categoryList);
    }
})

// post a new category

router.post('/', async (req, res) => {
    const newCategory = new categoryModel({
        name: req.body.name,
        image: req.body.image,
    })

    newCategory.save()
        .then((category) => {
            res.status(201).json({ success: true, message: "Category created successfully", data: category });
        })
        .catch((error) => {
            res.status(500).json({ success: false, message: "Failed to create category", details: error.message });
        })
})

//export the router
module.exports = router;