import queryString from "query-string";
import HTTP from "../../src/config";

const bookNameElement = document.getElementById("bookName") as HTMLElement;
const authorElement = document.getElementById("bookAuthor") as HTMLElement;
const bookCategoryElement = document.getElementById("bookCatagory") as HTMLElement;
const bookDescriptionElement = document.getElementById("bookDescription") as HTMLElement;
const bookKeywordsElement = document.getElementById("bookKeyword") as HTMLElement;
const downloadBtnElement = document.getElementById("download") as HTMLButtonElement;
const bookImgElement = document.getElementById("bookImg") as HTMLImageElement;


const book = queryString.parse(location.search);
// console.log(book);
const bookId = Number(book.bookId);

window.addEventListener("load", async () => {
    try {
        const res = await HTTP.get(`books/${bookId}`);
        const resImg = await HTTP.get(`/books/image/${bookId}`);

        // console.log(res);
        if (res.status === 200 && resImg.status === 200) {
            console.log(res.data);
            console.log(resImg.data);
            const bookData = res.data;
            // const bookImg = resImg.data;

            bookNameElement.textContent = bookData.book_name;
            authorElement.textContent = bookData.author_name;
            bookCategoryElement.textContent = bookData.category_name;
            bookDescriptionElement.textContent = bookData.description;
            bookKeywordsElement.textContent = bookData.keyword;
            bookImgElement.src = `http://localhost:8080/books/image/${bookId}`;
            //console.log(bookData.img_file_path);
            // const base64String = btoa(
            //     String.fromCharCode.apply(null, new Uint8Array(resImg.data))
            // );

            
            // bookImgElement.src = URL.createObjectURL(new Blob([resImg.data], { type: "image/jpeg" }));
        }
    } catch (error) {
        console.log(error);
    }
});

downloadBtnElement.addEventListener("click", async () => {
    try {
        console.log("sending request...");
        const res = await HTTP.get(`/books/download/${bookId}`, { responseType: "arraybuffer" });
        console.log(res);
        if (res.status === 200) {
            const blob = new Blob([res.data], { type: "application/pdf" });
            const link = document.createElement("a");
            link.href = window.URL.createObjectURL(blob);
            link.download = "book.pdf";
            link.click();
        }
    } catch (error) {
        console.log(error);
    }
});
