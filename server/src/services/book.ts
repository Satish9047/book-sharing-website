import * as bookRepositories from "../repositories/book";

export const getBooks = async () => {
    console.log("hello from the book service getbooks")
    const data = bookRepositories.getBooks();
    return data;
};

export const addBookHandler = async () => {
    console.log("hello from the book service add book handler")
    const data = bookRepositories.addBookHandler();
    return data;
};

export const updateBookHandler = async () => {
    const data = bookRepositories.updateBookHandler();
    return data;
};

export const deleteBookHandler = async () => {
    const data = bookRepositories.deleteBookHandler();
    return data;
};