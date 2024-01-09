import fs from "fs";
import { PrismaClient } from "@prisma/client";
import { IAddBook, IPage, IQueryBookDb, IBookInfo } from "../interfaces/book";
// import { IQueryBook } from "../interfaces/book";

const prisma = new PrismaClient();

//get the book from the database
export const getBooks = async (page: IPage) => {
    const data = await prisma.book.findMany({
        skip: page.skip,
        take: page.take,
        select: {
            book_id: true,
            book_name: true,
            author_name: true,
        }
    });
    return data;
};

//get the book by ID handler
export const getBookById = async (bookId: number) => {
    const data = await prisma.book.findUnique({ where: { book_id: bookId } });
    return data;
};


//handling the the search with query paramters
export const getSearchedBooks = async (query: IQueryBookDb) => {

    const { book_name, author_name, keyword, category_name } = query;
    //getting the book accoridng to the query parameter without having case sensitive
    const data = await prisma.book.findMany({
        where: {
            book_name: {
                contains: book_name,
                mode: "insensitive",
            },
            author_name: {
                contains: author_name,
                mode: "insensitive",
            },

            keyword: {
                contains: keyword,
                mode: "insensitive",
            },
            category_name: {
                contains: category_name,
                mode: "insensitive",
            }
        },
        select: {
            book_id: true,
            book_name: true,
            author_name: true,
        }
    });
    return data;
};

export const addBookHandler = async (bookInfo: IAddBook) => {
    console.log(bookInfo);
    try {
        //saving the new book in the database
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


//delete book handler
export const deleteBookHandler = async (bookInfo: IBookInfo) => {
    const bookId = bookInfo.bookId;
    const userId = bookInfo.userId;

    try {
        const book = await prisma.book.findFirst({ where: { book_id: bookId } });

        if (!book) {
            return { err: "book not found" };
        }
        console.log("user_id: ", book.user_id);
        console.log("userId: ", userId);

        if (book.user_id !== userId) {
            return { err: "you are not the owner of this book" };
        }

        const deleteBook = await prisma.book.delete({ where: { book_id: bookId } });
        return { msg: "book deleted", deleteBook: deleteBook };

    } catch (error) {
        console.log(error);
        return { err: "error while deleting book" };
    }
};


export const downloadBookHandler = async (bookInfo: number) => {
    const book = await prisma.book.findFirst({ where: { book_id: bookInfo } });
    if (!book) return { error: "Book not found" };
    const bookPath = book.pdf_file_path;

    return fs.createReadStream(bookPath);
};

export const getImageHandler = async (bookInfo: number) => {
    const book = await prisma.book.findUnique({ where: { book_id: bookInfo } });
    if (!book) {
        return { error: "book not found" };
    }
    const imgPath = book.img_file_path;
    // const imageExist = fs.existsSync(imagePath.img_file_path);
    return fs.createReadStream(imgPath);
};