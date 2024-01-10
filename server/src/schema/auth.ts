
import Joi from "joi";

//login validation schema
export const loginSchema = Joi.object({
    email: Joi.string().email().required().trim()
        .messages({
            "string.email": "Please enter a valid email address.",
            "any.required": "Email is required.",
            "string.empty": "Email must not be empty.",
        }),
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{8,30}$"))
        .messages({
            "string.pattern.base": "Password must be between 8 and 30 characters and contain only letters and numbers.",
        }),
});

//register validation schema
export const registerSchema = Joi.object({
    userName: Joi.string().min(2).required().trim()
        .messages({
            "string.base": "Username should be a string",
            "string.empty": "Username cannot be empty",
            "string.min": "Username must be at least 2 characters long",
            "any.required": "Username is required",
        }),
    email: Joi.string().email().required().trim()
        .messages({
            "string.base": "Email should be a valid string",
            "string.empty": "Email cannot be empty",
            "string.email": "Enter a valid email address",
            "any.required": "Email is required",
        }),
    password: Joi.string().trim().pattern(new RegExp("^[a-zA-Z0-9]{8,100}$"))
        .messages({
            "string.base": "Password should be a string",
            "string.empty": "Password cannot be empty",
            "string.pattern.base": "Password must be alphanumeric and between 8 to 100 characters long",
            "any.required": "Password is required",
        }),
});


