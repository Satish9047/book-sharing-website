import * as bookRepositories from "../repositories/book";

const getBooks = async()=>{
    const data = bookRepositories.getBooks;
    return data;
};