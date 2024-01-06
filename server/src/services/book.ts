import * as bookRepositories from "../repositories/book";
import { IAddBook } from "../interfaces/book";

export const getBooks = async () => {
    console.log("hello from the book service getbooks");
    const data = bookRepositories.getBooks();
    return data;
};

export const addBookHandler = async (bookInfo: IAddBook) => {
    console.log("hello from the book service add book handler");
    const data = bookRepositories.addBookHandler(bookInfo);
    return data;
};

export const updateBookHandler = async (bookInfo: string) => {
    const data = bookRepositories.updateBookHandler(bookInfo);
    return data;
};

export const deleteBookHandler = async (bookInfo: string) => {
    const data = bookRepositories.deleteBookHandler(bookInfo);
    return data;
};