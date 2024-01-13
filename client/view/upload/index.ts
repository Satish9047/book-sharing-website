import HTTP from "../../src/config";

const bookNameElement = document.getElementById("book-name") as HTMLInputElement;
const authorElement  = document.getElementById("author") as HTMLInputElement;
const categoryElement = document.getElementById("category") as HTMLInputElement;
const keywordElement = document.getElementById("keyword") as HTMLInputElement;
const bookPdfElement = document.getElementById("bookpdf") as HTMLInputElement;
const imageElement = document.getElementById("image") as HTMLInputElement;
const descriptionElement = document.getElementById("description") as HTMLInputElement;
const uploadBtn = document.getElementById("uploadBtn") as HTMLButtonElement;
const uploadDivElement = document.getElementById("uploadDiv")as HTMLDivElement;
const navAvatar = document.getElementById("navAvatar") as HTMLElement;
const avatarDiv = document.getElementById("avatarDiv") as HTMLDivElement;

//avatar state
let isProfile = false;

navAvatar.addEventListener("click", () => {
    isProfile = !isProfile;
    if (isProfile) {
        avatarDiv.style.display = "block";
        console.log("navAvatar is clicked");
    }else{
        avatarDiv.style.display = "none";
        console.log("navAvatar is clicked");
    }
});

uploadBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    const bookName = bookNameElement.value;
    const author = authorElement.value;
    const category = categoryElement.value;
    const keyword = keywordElement.value;
    const pdfFile = bookPdfElement.files?.[0];
    const imgFile = imageElement.files?.[0];

    const description = descriptionElement.value;
    //console.log({ bookName: bookName, author: author, category: category, keyword: keyword, bookPdf: bookPdf, image: image, description: description });
    try {
        const res = await HTTP.post("/books/addbook", {
            bookName,
            author,
            category,
            keyword,
            pdfFile,
            imgFile,
            description,
        }, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });

        if(res.status === 201) {
            console.log("successfully upload book", res);
        }
        
    } catch (error) {
        console.log(error.response.data);
        
        const div = document.createElement("div") as HTMLElement;
        div.classList.add("relative", "p-4", "bg-[#FF004D]");
        const paragraph = document.createElement("p") as HTMLElement;
        div.appendChild(paragraph);
        paragraph.innerText = error.response.data.error;
        uploadDivElement.appendChild(div);

        setTimeout(() => {
            uploadDivElement.removeChild(div);
        }, 3000);
    }

});