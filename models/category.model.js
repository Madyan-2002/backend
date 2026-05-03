const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },

});

const categoryModel = mongoose.model("category", CategorySchema);

module.exports = categoryModel;