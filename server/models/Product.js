const mongoose = require('mongoose')
const Schema = mongoose.Schema
const productSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    price: Number,
    productImage: {
        type: String,
        required: true
    }

})
module.exports = mongoose.model('Product',productSchema)
