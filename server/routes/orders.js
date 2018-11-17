const express = require('express')

const router = express.Router()
const OrderController = require('../controllers/OrderController')
router.get('/',OrderController.index)
router.post('/',OrderController.store)
router.put('/:id',OrderController.update)
router.delete('/:id',OrderController.destroy)
module.exports = router;
