import HTTP from "../config";
import { IBook } from "../interface/book";

const bookItemElement = document.getElementById("bookList") as HTMLDivElement;

//rendering the bookList in the browser
const bookItemsElement = document.getElementById("bookItems") as HTMLDivElement;
export function renderData(bookdata: []) {
    bookItemsElement.innerHTML = "";
    const bookList = bookdata;
    bookList.forEach((book: IBook) => {

        const div = document.createElement("div") as HTMLDivElement;
        div.classList.add("px-4", "py-2", "flex", "justify-between", "bg-[#F3F3F3]", "rounded-md", "shadow-md", "cursor-pointer", "hover:bg-[#00796B]");

        const heading = document.createElement("h1");
        heading.innerText = book.book_name;

        const paragraph = document.createElement("p");
        paragraph.innerText = book.author_name;

        const figure = document.createElement("figure");
        figure.classList.add("w-[30px]");

        const downloadImage = document.createElement("img");
        downloadImage.src = "/icon/download-icon.png";
        downloadImage.classList.add("w-[30px]");

        figure.appendChild(downloadImage);
        div.appendChild(heading);
        div.appendChild(paragraph);
        div.appendChild(figure);

        bookItemsElement.appendChild(div);

        //add event listener to the download icon
        figure.addEventListener("click", async (): Promise<void> => {
            console.log(book);

            try {
                //sending the request to download book pdf
                const res = await HTTP.get(`/books/download/${book.book_id}`, { responseType: "arraybuffer" });
                console.log(res);
                if (res.status === 200) {
                    const blob = new Blob([res.data], { type: "application/pdf" });
                    const link = document.createElement("a");
                    link.href = window.URL.createObjectURL(blob);
                    link.download = `${book.book_name}.pdf`;
                    link.click();
                    console.log("download suceesfull");
                }
            } catch (error) {
                console.log(error);
            }
        });

        //redirecting to the book detail page
        heading.addEventListener("click", (): void => {
            window.location.href = "/src/view/book/book.html?" + "bookId=" + book.book_id;
        });
    });
}


//request access token
export async function sendRefreshRequest() {
    try {
        const res = await HTTP.post("/refresh");
        if (res.status === 200) {
            window.location.reload();
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error(error);
        return false;
    }
}

//logout
export async function logout() {
    try {
        const res = await HTTP.get("/auth/logout");
        if (res.status === 200) {
            return true;
        }
        return false;
    } catch (error) {
        console.log(error);
        return false;
    }
}


//render user uploads
export function renderUserUploads(userBookData:[]) {

    const bookItem = userBookData;
    bookItemElement.innerHTML = "";
    bookItem.forEach((book: IBook) => {
        const div = document.createElement("div") as HTMLDivElement;
        div.classList.add("px-4", "py-2", "flex", "justify-between", "bg-[#F3F3F3]", "rounded-md", "shadow-md", "cursor-pointer", "hover:bg-[#00796B]");

        const heading = document.createElement("h1") as HTMLHeadElement;
        heading.innerText = book.book_name;

        const paragraph = document.createElement("p") as HTMLParagraphElement;
        paragraph.innerText = book.author_name;

        const figure = document.createElement("figure") as HTMLElement;
        figure.classList.add("w-[30px]");
        const deleteImage = document.createElement("img") as HTMLImageElement;
        deleteImage.classList.add("w-[30px]");
        deleteImage.src = "/icon/delete.png";

        figure.appendChild(deleteImage);
        div.appendChild(heading);
        div.appendChild(paragraph);
        div.appendChild(figure);

        bookItemElement.appendChild(div);


        figure.addEventListener("click", async () => {
            try {
                const res = await HTTP.delete(`/books/${book.book_id}`);
                console.log(res);
                window.location.reload();
            } catch (error) {
                console.log(error);
            }
        });

        heading.addEventListener("click", () => {
            window.location.href = "../book/book.html?" + "bookId=" + book.book_id;
        });
    });
}