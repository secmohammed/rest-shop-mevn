const Joi = require('joi')
module.exports = {
  register (req, res, next) {
    const schema = {
      email: Joi.string().required().email(),
      password: Joi.string().regex(
        new RegExp('^[a-zA-Z0-9]{8,32}$')
      ),
    }
    const { error, value } = Joi.validate(req.body, schema)
    if (error) {
        return res.status(422).json({
            messages: error.details.map((error) => error.message),
            data: value
        });
    }
    next()
  },
  resetPassword (req, res, next) {
    const schema = {
      token: Joi.string().required().token(),
      password: Joi.string().min(3).max(15).required(),
      password_confirmation: Joi.any().valid(Joi.ref('password')).required().options({ language: { any: { allowOnly: 'must match password' } } })
    }
    const request = {
      token : req.query.token,
      password: req.body.password,
      password_confirmation: req.body.password_confirmation
    }
    const { error, value } = Joi.validate(request, schema)
    if (error) {
      return res.status(422).json({
          messages: error.details.map((error) => error.message),
          data: value
      });
    }
    next()
  },
  login (req, res, next) {
    const schema = {
      email: Joi.string().required().email(),
      password: Joi.string().regex(
        new RegExp('^[a-zA-Z0-9]{8,32}$')
      ),
    }
    const { error, value } = Joi.validate(req.body, schema)
    if (error) {
        return res.status(422).json({
            messages: error.details.map((error) => error.message),
            data: value
        });
    }
    next()
  }
}
