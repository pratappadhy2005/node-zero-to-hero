const joi = require('joi');

const validatePost = (data) => {
    const schema = joi.object({
        title: joi.string().min(3).max(30).required(),
        content: joi.string().min(3).max(300).required(),
        mediaIds: joi.array().items(joi.string()).optional(),
    }).options({ allowUnknown: false, stripUnknown: true });
    return schema.validate(data);
};

module.exports = {
    validatePost,
};
