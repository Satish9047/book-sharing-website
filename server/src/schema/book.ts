import Joi from "joi";

//addbook validation schema
export const addBookSchema = Joi.object({
    bookName: Joi.string().required().trim(),
    author: Joi.string().required().trim(),
    description: Joi.string().required().min(3).max(30),
    imagePath: Joi.string().trim(),
});