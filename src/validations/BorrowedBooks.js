const Joi = require('joi');

const returnBookValidation = Joi.object({
    score: Joi.number().integer().required().min(0).max(10),

});

module.exports = {
    returnBookValidation
};
