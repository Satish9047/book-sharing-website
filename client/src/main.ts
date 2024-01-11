import HTTP from "./config";
import { IBook } from "./interface/book";

const bookItemsElement = document.getElementById("bookItems") as HTMLDivElement;
// const downloadBtnElement = document.getElementById("downloadBtn") as HTMLDivElement;
window.addEventListener("load", async () => {
    const res = await HTTP.get("/books?skip=0&take=5");
    console.log(res);

    if (res.status === 200) {
        console.log(res.data);
        const bookItems = res.data;
        bookItemsElement.innerHTML = "";
        bookItems.forEach((book: IBook) => {

            const div = document.createElement("div") as HTMLDivElement;
            div.classList.add("px-4", "py-2", "flex", "justify-between", "bg-[#F3F3F3]", "rounded-md", "shadow-md");

            const heading = document.createElement("h1");
            heading.innerText = book.book_name;

            const paragraph = document.createElement("p");
            paragraph.innerText = book.author_name;

            const figure = document.createElement("figure");
            const downloadImage = document.createElement("img");
            downloadImage.src = "public/icon/download-icon.png";

            figure.appendChild(downloadImage);
            div.appendChild(heading);
            div.appendChild(paragraph);
            div.appendChild(figure);

            div.addEventListener("click", ()=>{
                window.location.href = "../view/book/book.html?"+"bookId="+book.book_id;
            });

            figure.addEventListener("click", async () => {
                console.log(book);

                try {
                    const res = await HTTP.get(`/books/download/${book.book_id}`, {responseType: "arraybuffer"});
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
            bookItemsElement.appendChild(div);

        });
    }
});



// downloadBtnElement.addEventListener("click", async (e) =>{
//     const bookid = (e.target as HTMLElement).getAttribute("data-bookid");
//     console.log(bookid);
//     //const res = await HTTP.get("/download/:id");
// });