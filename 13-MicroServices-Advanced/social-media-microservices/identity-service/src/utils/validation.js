const joi = require('joi');

const validateRegisterUser = (data) => {
    const schema = joi.object({
        username: joi.string().min(3).max(30).required(),
        email: joi.string().email().min(5).max(50).required(),
        password: joi.string().min(8).max(30).required(),
        firstName: joi.string().min(3).max(30).required(),
        lastName: joi.string().min(3).max(30).required(),
        role: joi.string().valid('user').optional(),
    }).options({ allowUnknown: false, stripUnknown: true });
    return schema.validate(data);
};

module.exports = {
    validateRegisterUser,
};
