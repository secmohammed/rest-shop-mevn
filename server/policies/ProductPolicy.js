const Joi = require('joi')
const multer = require('multer')
module.exports = {
    upload(req, res, next) {
        let storage = multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, '../uploads/')
            },
            filename: (req, file, cb) => {
                cb(null,new Date().toISOString() + file.originalname)
            },
        })
        let fileFilter = (req, file, cb) => {
            if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
                cb(null, true)
            }else {
                cb(null, false)
            }
        }
        let upload = multer({
            storage,
            limits: {
                fileSize: 1024 * 1024 * 5
            },
            fileFilter
        })
        return upload.single('productImage')
    },
    update (req, res, next) {
        const schema = {
          name: Joi.string().required(),
          price: Joi.number().positive().max(10),
          productImage: Joi.string().required()
        }
        const { error, value } = Joi.validate(req.body, schema)
    }
}
