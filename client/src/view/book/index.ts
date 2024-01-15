import queryString from "query-string";
import HTTP from "../../config";
import { logout } from "../../utils/utils";

//Refreshing DOM Elements
const bookNameElement = document.getElementById("bookName") as HTMLElement;
const authorElement = document.getElementById("bookAuthor") as HTMLElement;
const bookCategoryElement = document.getElementById("bookCatagory") as HTMLElement;
const bookDescriptionElement = document.getElementById("bookDescription") as HTMLElement;
const bookKeywordsElement = document.getElementById("bookKeyword") as HTMLElement;
const downloadBtnElement = document.getElementById("download") as HTMLButtonElement;
const bookImgElement = document.getElementById("bookImg") as HTMLImageElement;
const navAvatar = document.getElementById("navAvatar") as HTMLElement;
const avatarDiv = document.getElementById("avatarDiv") as HTMLDivElement;
const logoutElement = document.getElementById("logout") as HTMLElement;

//state
let isProfile = false;

//getting book id from previous page
const book = queryString.parse(location.search);
const bookId = Number(book.bookId);


//onload listner
window.addEventListener("load", async () => {
    try {
        const res = await HTTP.get(`books/${bookId}`);
        const resImg = await HTTP.get(`/books/image/${bookId}`);

        if (res.status === 200 && resImg.status === 200) {
            console.log(res.data);
            console.log(resImg.data);
            const bookData = res.data;

            //injecting book info to DOM
            bookNameElement.textContent = bookData.book_name;
            authorElement.textContent = bookData.author_name;
            bookCategoryElement.textContent = bookData.category_name;
            bookDescriptionElement.textContent = bookData.description;
            bookKeywordsElement.textContent = bookData.keyword;
            bookImgElement.src = `http://localhost:8080/books/image/${bookId}`;

        }
    } catch (error) {
        console.log(error);
    }
});


//nav profile listner
navAvatar.addEventListener("click", () => {
    isProfile = !isProfile;
    if (isProfile) {
        avatarDiv.style.display = "block";
        console.log("navAvatar is clicked");
    } else {
        avatarDiv.style.display = "none";
        console.log("navAvatar is clicked");
    }
});

//logout button listner
logoutElement.addEventListener("click", async () => {
    const result = await logout();
    if (result) {
        window.location.replace("../login/login.html");
    }
});

//download button listner
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
