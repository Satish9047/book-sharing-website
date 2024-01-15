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
    keyword: Joi.string().min(2),
    skip: Joi.number(),
    take: Joi.number()
});


export const queryPageSchema = Joi.object({
    skip: Joi.number().required(),
    take: Joi.number().required()
});



export const uploadBookSchema = Joi.object({
    bookName: Joi.string().required().max(20)
        .messages({
            "string.base": "Book name must be a string",
            "string.empty": "Book name is required",
            "string.max": "Book name should have a maximum length of 20 characters"
        }),
    author: Joi.string().required().max(20)
        .messages({
            "string.base": "Author must be a string",
            "string.empty": "Author is required",
            "string.max": "Author should have a maximum length of 20 characters"
        }),
        
    category: Joi.string().required().max(10)
        .messages({
            "string.base": "Category must be a string",
            "string.empty": "Category is required",
            "string.max": "Category should have a maximum length of 10 characters"
        }),
        
    keyword: Joi.string().required().max(10)
        .messages({
            "string.base": "Keyword must be a string",
            "string.empty": "Keyword is required",
            "string.max": "Keyword should have a maximum length of 10 characters"
        }),
        
    description: Joi.string().required().max(50)
        .messages({
            "string.base": "Description must be a string",
            "string.empty": "Description is required",
            "string.max": "Description should have a maximum length of 50 characters"
        }),
        
    pdfFile: Joi.binary().required().max(5242880)
        .messages({
            "binary.base": "PDF file must be a binary data",
            "binary.empty": "PDF file is required",
            "binary.max": "PDF file size should not exceed 5 MB"
        }),
        
    imgFile: Joi.binary().required().max(5242880)
        .messages({
            "binary.base": "Image file must be a binary data",
            "binary.empty": "Image file is required",
            "binary.max": "Image file size should not exceed 5 MB"
        }),
});