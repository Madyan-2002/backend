const mongoose = require('mongoose');
const CategoryModel = require('./category.model');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    description: {
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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category', // تأكد أن الاسم يطابق الموديل الآخر تماماً
        required: [true, 'Category is required']
    },
    price: {
        type: Number,
        default: 0
    },
    numberInStock: {
        type: Number,
        min: 0,
        max: 1000,
        default: 0
    },
    date:
    {
        type: Date,
        default: Date.now,
    }
});

const productModel = mongoose.model("product", productSchema);

module.exports = productModel;