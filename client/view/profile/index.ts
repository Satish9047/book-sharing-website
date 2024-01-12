import { IBook } from "./../../src/interface/book";
import HTTP from "../../src/config";

// const profileImgElement = document.getElementById("profileImg") as HTMLImageElement;
const bookItemElement = document.getElementById("bookList") as HTMLDivElement;
// const deleteElement = document.getElementById("deleteIcon") as HTMLImageElement;
const uploadPageBtn = document.getElementById("uploadPageBtn") as HTMLButtonElement;
const userNameElement = document.getElementById("userName") as HTMLHeadingElement;
const emailElement = document.getElementById("email") as HTMLHeadingElement;


window.addEventListener("load", async () => {
    try {
        const res = await HTTP.get("/auth/userInfo");
        const resBookdata = await HTTP.get("books/user");
        if (res.status === 200 && resBookdata.status === 200) {
            console.log(res.data);
            console.log(resBookdata.data);
            //userId = res.data.user_id;
            userNameElement.textContent = res.data.user_name;
            emailElement.textContent = res.data.email;

            const bookItem = resBookdata.data;
            bookItemElement.innerHTML = "";

            bookItem.forEach((book: IBook) => {
                const div = document.createElement("div") as HTMLDivElement;
                div.classList.add("px-4", "py-2", "flex", "justify-between", "bg-[#F3F3F3]", "rounded-md", "shadow-md");

                const heading = document.createElement("h1") as HTMLHeadElement;
                heading.innerText = book.book_name;

                const paragraph = document.createElement("p") as HTMLParagraphElement;
                paragraph.innerText = book.author_name;

                const figure = document.createElement("figure") as HTMLElement;
                figure.classList.add("w-[30px]");
                const deleteImage = document.createElement("img") as HTMLImageElement;
                // deleteImage.classList.add("w-3");
                deleteImage.src = "../../public/icon/delete.png";

                figure.appendChild(deleteImage);
                div.appendChild(heading);
                div.appendChild(paragraph);
                div.appendChild(figure);

                bookItemElement.appendChild(div);


                figure.addEventListener("click", async()=>{
                    try {
                        const res = await HTTP.delete(`/books/${book.book_id}`);
                        console.log(res);
                    } catch (error) {
                        console.log(error); 
                    }
                });

                heading.addEventListener("click",()=>{
                    window.location.href = "../book/book.html?"+"bookId="+book.book_id;
                });
            });
        }
    } catch (error) {
        console.log(error);
    }
});

uploadPageBtn.addEventListener("click", () => {
    window.location.href = "../upload/upload.html";
});

// deleteElement.addEventListener("click", () => {

// });