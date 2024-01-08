import { PrismaClient } from "@prisma/client";
import { IAddBook } from "../interfaces/book";

const prisma = new PrismaClient();

export const getBooks = async () => {
    return "hello from repositories";
};

export const addBookHandler = async (bookInfo: IAddBook) => {
    console.log(bookInfo);

    try {

        const book = await prisma.book.create({
            data: {
                book_name: bookInfo.bookName,
                description: bookInfo.description,
                author_name: bookInfo.author,
                user_id: bookInfo.user,
                category_name: bookInfo.category,
                keyword: bookInfo.keyword,
                pdf_file_path: bookInfo.pdfPath,
                img_file_path: bookInfo.imgPath,
            },
        });
        return book;
    } catch (error) {
        console.log(error);
        return { error: "error while adding book" };
    }
};

export const updateBookHandler = async (bookInfo: string) => {
    console.log(bookInfo);

    return "hello from updateBookHandler repositories";
};

export const deleteBookHandler = async (bookInfo: string) => {
    console.log(bookInfo);
    const id = Number(bookInfo);
    const book = await prisma.book.findFirst({ where: { book_id: id } });
    if (!book) {
        return { err: "book not found" };
    }
    try {
        const deleteBook = await prisma.book.delete({ where: { book_id: id } });
        return { msg: "book deleted", deleteBook: deleteBook };
    } catch (error) {
        console.log(error);
        return { err: "error while deleting book" };
    }
};