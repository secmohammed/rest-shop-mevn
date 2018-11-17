const express = require('express')
const multer = require('multer')
const auth = require('../middleware/auth')
const ProductPolicy = require('../policies/ProductPolicy')
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/')
    },
    filename: (req, file, cb) => {
        cb(null,new Date().toISOString() + file.originalname)
    },
})
const fileFilter = (req, file, cb) => {
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
        cb(null, true)
    }else {
        cb(null, false)
    }
}
const upload = multer({
    storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter
})
const router = express.Router()
const ProductController = require('../controllers/ProductController')
router.get('/',ProductController.index)
router.get('/:id',ProductController.show)
router.post('/',upload.single('productImage'), ProductController.store)
router.put('/:id',[auth,ProductPolicy.update],ProductController.update)
router.delete('/:id',ProductController.destroy)
module.exports = router;
