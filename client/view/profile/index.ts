import HTTP from "../../src/config";

// const profileImgElement = document.getElementById("profileImg") as HTMLImageElement;
const deleteElement = document.getElementById("deleteIcon") as HTMLImageElement;
const uploadPageBtn = document.getElementById("uploadPageBtn") as HTMLButtonElement;
// const userNameEleemnt = document.getElementById("username") as HTMLHeadingElement;
// const emailElement = document.getElementById("email") as HTMLHeadingElement;
// const bookListElement = document.getElementById("bookList") as HTMLDivElement;

window.addEventListener("load", async () => {
    try {
        const res = await HTTP.get("/books?skip=0&take=5");
        const booksData = res.data;

        if (res.status === 200) {
            console.log("got data from server", booksData);
        }
    } catch (error) {
        console.error(error);
    }
});

uploadPageBtn.addEventListener("click", () => {
    window.location.href = "../upload/upload.html";
});

deleteElement.addEventListener("click", () => {

});