import * as bookRepositories from "../repositories/book";
import { IAddBook } from "../interfaces/book";
import { IQueryBook } from "../interfaces/book";

export const getBooks = async () => {
    //console.log("hello from the book service getbooks");
    const data = bookRepositories.getBooks();
    return data;
};

export const getSearchedBooks = async (query: IQueryBook) => {
    // const { name, author, keyword, category } = query;

    console.log(query);

    return { query };
};

export const addBookHandler = async (bookInfo: IAddBook) => {
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