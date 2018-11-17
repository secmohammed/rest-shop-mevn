const Product = require('../models/Product')
const mongoose = require('mongoose')
module.exports = {
    async index(req, res) {
        try {
            let products = await Product.find()
            if (products.length) {
                res.send({
                    products
                })
            }else {
                res.status(404).send({
                    message: 'No Entries Found'
                })
            }

        } catch(e) {
            // statements
            console.log(e);
        }
    },
    async show(req, res, next) {
        try {
            let product = await Product.findById(req.params.id)
            res.send({ product })
        } catch(e) {
            e.status = 404
            e.message = "Could not find this product"
            next(e)
        }
    },
    async store(req, res, next) {
        try {
            req.body.productImage = req.file.path
            req.body._id = new mongoose.Types.ObjectId()
            let product = await Product.create(req.body)
            res.send(product)
        } catch(e) {
            e.status = 201
            next(e)
        }
    },
    async update(req, res) {
        let product = await Product.findByIdAndUpdate(req.params.id,req.body, {
            new: true
        })
        res.send(product)
    },
    async destroy(req, res, next) {
        try {
           let product = await Product.findOneAndDelete(req.params.id)
           res.send({ product })
        } catch(e) {
            next(e)
        }

    }
}
