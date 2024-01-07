import { IAddBook } from "../interfaces/book";

export const getBooks = async () => {
    return "hello from repositories";
};

export const addBookHandler = async (bookInfo: IAddBook) => {
    console.log(bookInfo);
    return "hello from addBookHandler repositories";
};

export const updateBookHandler = async (bookInfo: string) => {
    console.log(bookInfo);
    return "hello from updateBookHandler repositories";
};

export const deleteBookHandler = async (bookInfo: string) => {
    console.log(bookInfo);
    return "hello from deletebookhandler repositories";
};