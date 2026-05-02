const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    descriptios: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    images: [{
        type: String,
    }],
    category: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category'
    },
    price: {
        type: Number,
        default: 0
    },
    numberInStock: {
        type: Number,
        min: 0,
        max: 1000,
        required: true
    },
    date:
    {
        type: Date,
        default: Date.now,
    }
});

const productModel = mongoose.model("product", productSchema);

module.exports = productModel;