import HTTP from "../config";
import { IBook } from "../interface/book";

//rendering the bookList in the browser
const bookItemsElement = document.getElementById("bookItems") as HTMLDivElement;
export function renderData(bookdata: []) {
    bookItemsElement.innerHTML = "";
    const bookList = bookdata;
    bookList.forEach((book:IBook) => {
        const div = document.createElement("div") as HTMLDivElement;
        div.classList.add("px-4", "py-2", "flex", "justify-between", "bg-[#F3F3F3]", "rounded-md", "shadow-md");

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
                    link.download = "bookhome.pdf";
                    link.click();
                    console.log("download suceesfull");
                }
            } catch (error) {
                console.log(error);
            }
        });

        //redirecting to the book detail page
        heading.addEventListener("click", (): void => {
            window.location.href = "../view/book/book.html?" + "bookId=" + book.book_id;
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