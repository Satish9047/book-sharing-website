import * as bookRepositories from "../repositories/book";
import { IAddBook, IBookInfo, IPage } from "../interfaces/book";
import { IQueryBook } from "../interfaces/book";

// get book service
export const getBooks = async (page: IPage) => {
    const data = bookRepositories.getBooks(page);
    return data;
};

//get book by id service
export const getBookById = async (bookId: number) => {
    const data = bookRepositories.getBookById(bookId);
    return data;
};

//get book by search service
export const getSearchedBooks = async (query: IQueryBook) => {
    const data = bookRepositories.getSearchedBooks(query);
    console.log(query);
    return data;
};

//add book service
export const addBookHandler = async (bookInfo: IAddBook) => {
    const data = bookRepositories.addBookHandler(bookInfo);
    return data;
};


//update book service
export const updateBookHandler = async (bookInfo: string) => {
    const data = bookRepositories.updateBookHandler(bookInfo);
    return data;
};


//delete book service
export const deleteBookHandler = async (bookInfo: IBookInfo) => {
    //console.log(bookInfo.userId, "from services deleteBookHandler");
    const data = bookRepositories.deleteBookHandler(bookInfo);
    return data;
};


//download book service
export const downloadBookHandler = async (bookInfo: number) => {
    const data = bookRepositories.downloadBookHandler(bookInfo);
    return data;
};


//get image service
export const getImageHandler = async (bookInfo: number) => {
    const data = bookRepositories.getImageHandler(bookInfo);
    return data;
};


//get book by user service
export const getBookByUser = async(userId: number) => {
    const data = bookRepositories.getBookByUser(userId);
    return data;
};