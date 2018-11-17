const express = require('express')
const router = express.Router()
const UserController = require('../controllers/UserController')
const guest = require('../middleware/guest')
router.post('/register',guest, UserController.register)
router.get('/register',guest,function(req, res) {
    res.send({
        message:'Hello'
    })
})
router.post('/login',guest,UserController.login)
router.delete('/:id', UserController.destroy)
module.exports = router;
