
import Joi from "joi";

//login validation schema
export const loginSchema = Joi.object({
    email: Joi.string().email().required().trim(),
    password: Joi.string().trim().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
});

//register validation schema
export const registerSchema = Joi.object({
    userName: Joi.string().min(2).required().trim(),
    email: Joi.string().email().required().trim(),
    password: Joi.string().trim().pattern(new RegExp("^[a-zA-Z0-9]{8,100}$")),
});

