import queryString from "query-string";
import HTTP from "../../src/config";


const book = queryString.parse(location.search);
// console.log(book);
const bookId = Number(book.bookId);

window.addEventListener("load", async()=>{
    try {
        const res = await HTTP.get(`books/${bookId}`);
        console.log(res);
        if(res.status===200){
            console.log("all good");
        }
    } catch (error) {
        console.log(error);
    }
});