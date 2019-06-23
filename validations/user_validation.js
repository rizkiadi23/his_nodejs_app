const Joi = require('@hapi/joi')

// Register Validation
const registerValidation = data => {
      const schema = {
            firstName: Joi.string()
                  .min(5)
                  .required(),
            lastName: Joi.string().min(5).required(),
            email: Joi.string()
                  .min(5)
                  .required()
                  .email(),
            password: Joi.string()
                  .min(6)
                  .required()
      };
      return Joi.validate(data, schema);
}

module.exports.registerValidation = registerValidation;