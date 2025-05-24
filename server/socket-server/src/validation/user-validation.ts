import Joi from "joi";

const createUserValidation = Joi.object({
    name: Joi.string().max(100).required(),
    email: Joi.string().max(200).email(),
    role: Joi.string().max(100),
    password: Joi.string().max(100),
});

const removeUserValidation = Joi.string().max(100).required();

const updateUserValidation = Joi.object({
    id: Joi.string().max(100).required(),
    name: Joi.string().max(100).required(),
    email: Joi.string().max(200).email(),
    role: Joi.string().max(100),
});

export {
    createUserValidation,
    updateUserValidation,
    removeUserValidation,
}