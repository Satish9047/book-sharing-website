import Joi from "joi";

//login validation schema
export const loginSchema = Joi.object({
    email: Joi.string().email().required().trim(),
    password: Joi.string().trim().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
});

//register validation schema
export const registerSchema = Joi.object({
    userName: Joi.string().min(2).required().trim(),
    email: Joi.string().email().required().trim(),
    password: Joi.string().trim().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
});

//addbook validation schema
export const addBookSchema = Joi.object({
    bookName: Joi.string().required().trim(),
    author: Joi.string().required().trim(),
    description: Joi.string().required().min(3).max(30),
    imagePath: Joi.string.required().trim(),
});