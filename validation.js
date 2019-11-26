const Joi = require('@hapi/joi');

const registrationValidator = data => {
    const schema = Joi.object({
        name: Joi.string()
            .min(2)
            .required(),
    
        email: Joi.string()
            .min(6)
            .required()
            .email(),
    
        password: Joi.string()
            .min(6)
            .required(),
    });

    return schema.validate(data);
}

const loginValidator = data => {
    const schema = Joi.object({
        name: Joi.string()
            .min(2)
            .required(),
    
        password: Joi.string()
            .min(6)
            .required(),
    });
    return schema.validate(data);
}

module.exports = { registrationValidator, loginValidator };