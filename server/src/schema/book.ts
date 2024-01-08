import Joi from "joi";

//addbook validation schema
export const addBookSchema = Joi.object({
    bookName: Joi.string().required().trim(),
    author: Joi.string().required().trim(),
    description: Joi.string().required().min(3).max(30),
    pdfPath: Joi.string(),
    imgPath: Joi.string(),
    keyWords: Joi.string().required(),
    category: Joi.string().required(),
});
