import * as bookRepositories from "../repositories/book";
import { IAddBook, IBookInfo, IPage } from "../interfaces/book";
import { IQueryBook } from "../interfaces/book";

export const getBooks = async (page: IPage) => {
    //console.log("hello from the book service getbooks");
    const data = bookRepositories.getBooks(page);
    return data;
};

export const getSearchedBooks = async (query: IQueryBook) => {

    const data = bookRepositories.getSearchedBooks(query);
    console.log(query);

    return data;
};

export const addBookHandler = async (bookInfo: IAddBook) => {
    const data = bookRepositories.addBookHandler(bookInfo);
    return data;
};

export const updateBookHandler = async (bookInfo: string) => {
    const data = bookRepositories.updateBookHandler(bookInfo);
    return data;
};

export const deleteBookHandler = async (bookInfo: IBookInfo) => {
    console.log(bookInfo.userId, "from services deleteBookHandler");
    const data = bookRepositories.deleteBookHandler(bookInfo);
    return data;
};