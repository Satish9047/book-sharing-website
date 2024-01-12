import HTTP from "./config";
import { IBook } from "./interface/book";

const bookItemsElement = document.getElementById("bookItems") as HTMLDivElement;
const searchByList = document.getElementById("searchByList") as HTMLDivElement;
const searchInputElement = document.getElementById("searchInput") as HTMLInputElement;

//array for label
const searchLabel = ["By Book Name", "by Author Name", "by Keyword", "by Category"];

//state for getting data query
const state = {
    "By Book Name": false,
    "by Author Name": false,
    "by Keyword": false,
    "by Category": false,
};

//search value
let value = "";


//rendering the search by div
for (let i = 0; i < searchLabel.length; i++) {
    const div = document.createElement("div") as HTMLDivElement;
    div.classList.add("p-2", "flex", "gap-2", "bg-[#F3F3F3]", "shadow-lg", "rounded-md");

    const input = document.createElement("input") as HTMLInputElement;
    input.type = "checkbox";

    const label = document.createElement("label") as HTMLLabelElement;
    label.innerText = searchLabel[i];
    div.appendChild(input);
    div.appendChild(label);
    searchByList.appendChild(div);

    input.addEventListener("change", async () => {
        // console.log(searchLabel[i], input.checked);
        state[searchLabel[i]] = input.checked;
        console.log(state);
        // await getBook();
    });
}



//adding event listeners to the input field
searchInputElement.addEventListener("keydown", async(ev)=>{
    if(ev.key === "Enter"){
        value = searchInputElement.value;
        console.log("enter is clicked", value);
        const res = await getBook();
        console.log(res);

        const bookItems = res.data;
        bookItemsElement.innerHTML = "";

        //rendering the list of books in the dom
        bookItems.forEach((bookItem:IBook)=>{
            const div = document.createElement("div") as HTMLDivElement;
            div.classList.add("p-2", "flex", "gap-2", "justify-between", "bg-[#F3F3F3]", "shadow-lg", "rounded-md");

            const heading = document.createElement("h1") as HTMLHeadingElement;
            heading.innerText = bookItem.book_name;
            div.appendChild(heading);

            const paragraph= document.createElement("p") as HTMLParagraphElement;
            paragraph.innerText = bookItem.author_name;
            div.appendChild(paragraph);

            const figure = document.createElement("figure");
            figure.classList.add("w-[30px]");

            const downloadImage = document.createElement("img");
            downloadImage.src = "../../public/icon/download-icon.png";
            downloadImage.classList.add("w-[30px]");
            
            figure.appendChild(downloadImage);
            div.appendChild(heading);
            div.appendChild(paragraph);
            div.appendChild(figure);

            //for download event listeners
            figure.addEventListener("click", async () => {
                
                //console.log(book);
                try {
                    //sending the request to download book pdf
                    const res = await HTTP.get(`/books/download/${bookItem.book_id}`, { responseType: "arraybuffer" });
                    console.log(res);
                    if (res.status === 200) {
                        const blob = new Blob([res.data], { type: "application/pdf" });
                        const link = document.createElement("a");
                        link.href = window.URL.createObjectURL(blob);
                        link.download = "bookhome.pdf";
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


//onload event listeners
window.addEventListener("load", async () => {

    //fetching the data from the server
    const res = await getBook();
    console.log(res);
    if (res.status === 200) {
        console.log(res.data);
        const bookItems = res.data;
        bookItemsElement.innerHTML = "";

        //rendering the list of books
        bookItems.forEach((book: IBook) => {

            const div = document.createElement("div") as HTMLDivElement;
            div.classList.add("px-4", "py-2", "flex", "justify-between", "bg-[#F3F3F3]", "rounded-md", "shadow-md");

            const heading = document.createElement("h1");
            heading.innerText = book.book_name;

            const paragraph = document.createElement("p");
            paragraph.innerText = book.author_name;

            const figure = document.createElement("figure");
            figure.classList.add("w-[30px]");

            const downloadImage = document.createElement("img");
            downloadImage.src = "../../public/icon/download-icon.png";
            downloadImage.classList.add("w-[30px]");

            figure.appendChild(downloadImage);
            div.appendChild(heading);
            div.appendChild(paragraph);
            div.appendChild(figure);

            bookItemsElement.appendChild(div);

            //add event listener to the download icon
            figure.addEventListener("click", async () => {
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
                    }
                } catch (error) {
                    console.log(error);
                }
            });

            //redirecting to the book detail page
            heading.addEventListener("click", () => {
                window.location.href = "../view/book/book.html?" + "bookId=" + book.book_id;
            });
        });
    }
});



/**
 * Get book data from the Backend api accoring to the search by options
 * 
 * @returns object //it returns the fetch data from the API
 */
function getBook() {
    let url = "";
    console.log("hello world",value);
    if (state["By Book Name"]) {
        url += `name=${value}`;
    }
    if(state["by Author Name"]){
        url += `&author=${value}`;
    }
    if(state["by Keyword"]){
        url += `&keyword=${value}`;
    }
    if(state["by Category"]){
        url += `&category=${value}`;
    }
    return HTTP.get("/books/getby?"+url);
}