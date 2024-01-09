import Joi from "joi";

//addbook validation schema
export const addBookSchema = Joi.object({
    bookName: Joi.string().required().trim(),
    author: Joi.string().required().trim(),
    description: Joi.string().required().min(3).max(30),
    pdfPath: Joi.string(),
    imgPath: Joi.string(),
    keyword: Joi.string().required(),
    category: Joi.string().required(),
});

export const queryBookSchema = Joi.object({
    name: Joi.string().min(2),
    author: Joi.string().min(2),
    category: Joi.string().min(2),
    keyword: Joi.string().min(2)
});


export const queryPageSchema = Joi.object({
    skip: Joi.number().required(),
    take: Joi.number().required()
});