import HTTP from "../../src/config";

const profileImgElement = document.getElementById("profileImg") as HTMLImageElement;
const deleteElement = document.getElementById("deleteIcon") as HTMLImageElement;
const uploadPageBtn = document.getElementById("uploadPageBtn") as HTMLButtonElement;
const userNameEleemnt = document.getElementById("username") as HTMLHeadingElement;
const emailElement = document.getElementById("email") as HTMLHeadingElement;
const bookListElement = document.getElementById("bookList") as HTMLDivElement;

window.addEventListener("load", async () => {
    try {
        const res = await HTTP.get("/books?skip=0&take=5");
        const booksData = res.data;

        if (res.status === 200) {
            booksData.forEach(book => {

                <div class="px-4 py-2 flex justify-between bg-gray-200 rounded-md shadow-md" >
                    <h3 class="text-xl font-semibold" > `${book.name}` < /h3>
                    < p class="text-gray-600" > `${book.author}`< /p>
                    <figure> <img src="../../public/icon/delete.png" class="w-8 h-8" > </figure>
                < /div>

            });
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