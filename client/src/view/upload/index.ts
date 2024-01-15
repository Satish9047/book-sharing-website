import { AxiosError } from "axios";
import HTTP from "../../config";
import { logout, sendRefreshRequest } from "../../utils/utils";

const bookNameElement = document.getElementById("book-name") as HTMLInputElement;
const authorElement = document.getElementById("author") as HTMLInputElement;
const categoryElement = document.getElementById("category") as HTMLInputElement;
const keywordElement = document.getElementById("keyword") as HTMLInputElement;
const bookPdfElement = document.getElementById("bookpdf") as HTMLInputElement;
const imageElement = document.getElementById("image") as HTMLInputElement;
const descriptionElement = document.getElementById("description") as HTMLInputElement;
const uploadBtn = document.getElementById("uploadBtn") as HTMLButtonElement;
const uploadDivElement = document.getElementById("uploadDiv") as HTMLDivElement;
const navAvatar = document.getElementById("navAvatar") as HTMLElement;
const avatarDiv = document.getElementById("avatarDiv") as HTMLDivElement;
const logoutElement = document.getElementById("logout") as HTMLElement;
// const settingElement = document.getElementById("setting") as HTMLDivElement;

//avatar state
let isProfile = false;

//on load
window.addEventListener("load", async () => {
    try {
        const res = await HTTP.get("/auth/userInfo");
        if (res.status === 200) {
            console.log(res.data);
        }
    } catch (error) {
        console.log(error);
        // if (
        //     (error as AxiosError).response && (error as AxiosError).response?.status === 401) {
        //     try {
        //         const result = await sendRefreshRequest();
        //         if (!result) {
        //             window.location.replace("../login/login.html");
        //         }
        //     } catch (error) {
        //         console.log(error);
        //     }
        // } else {
        //     
        // }
    }
});


//eventlistener to nav profile
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

//eventlistner to logout button
logoutElement.addEventListener("click", async () => {
    const result = await logout();
    if (result) {
        window.location.replace("src/view/login/login.html");
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

        if (res.status === 201) {
            console.log("successfully upload book", res);

            const div = document.createElement("div") as HTMLElement;
            div.classList.add("p-2", "successColor", "shadow-md", "rounded-md");
            const paragraph = document.createElement("p") as HTMLElement;
            div.appendChild(paragraph);
            paragraph.innerText = "book is successfully uploaded";
            uploadDivElement.appendChild(div);

            setTimeout(() => {
                uploadDivElement.removeChild(div);
            }, 3000);
        }

    } catch (error) {
        console.log(error.response.data);

        const div = document.createElement("div") as HTMLElement;
        div.classList.add("p-2", "errorColor", "rounded-md", "shadow-md");
        const paragraph = document.createElement("p") as HTMLElement;
        div.appendChild(paragraph);
        paragraph.innerText = error.response.data.error;
        uploadDivElement.appendChild(div);

        setTimeout(() => {
            uploadDivElement.removeChild(div);
        }, 3000);
    }

});