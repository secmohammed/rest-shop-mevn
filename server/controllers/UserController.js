const User = require('../models/User')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
module.exports = {
    async login(req, res) {
       let user = await User.findOne({email: req.body.email})
       if (!user) {
            return res.status(401).send({
                message: 'Invalid Credentials.'
            })
       }
       bcrypt.compare(req.body.password, user.password, (err, isMatching) => {
            if (!isMatching || err) {
                return res.status(401).send({
                    message: 'Invalid Credentials.'
                })
            }
            const token = jwt.sign({
                email: user.email,
                id: user._id
            },
            process.env.JWT_KEY, {
                expiresIn: "1h"
            })
            return res.status(200).send({
                message: 'Logged In.',
                token
            })
       })
    },
    async register(req, res, next) {
        User.find({ email: req.body.email }).exec().then(user => {
            if (user.length) {
                return res.status(409).send({
                    message: 'Mail exists'
                })
            }
            bcrypt.hash(req.body.password,10,(err, hash) => {
            if (err) {
                return res.status(500).send({
                    error: err
                })
            }
            const user = new User({
                _id: new mongoose.Types.ObjectId(),
                email: req.body.email,
                password: hash
            })
            user.save().then(user => {
                res.status(201).send({
                    message: 'User Created',
                    user
                })
            }).catch(e => next(e))
        })
        })

    },
    async destroy(req, res) {
        let user = await User.findByIdAndRemove(req.params.id)
        if (user) {
            res.send({
                message: 'You have deleted your account.'
            })
        }
    }
}
