import HTTP from "../../config";
import { logout, renderUserUploads} from "../../utils/utils";
import { constant } from "../../constants";

const uploadPageBtn = document.getElementById("uploadPageBtn") as HTMLButtonElement;
const userNameElement = document.getElementById("userName") as HTMLHeadingElement;
const emailElement = document.getElementById("email") as HTMLHeadingElement;
const navAvatar = document.getElementById("navAvatar") as HTMLElement;
const avatarDiv = document.getElementById("avatarDiv") as HTMLDivElement;
const logoutElement = document.getElementById("logout") as HTMLElement;
const prevElement = document.getElementById("prev") as HTMLDivElement;
const nextElement = document.getElementById("next") as HTMLDivElement;

//avatar state
let isProfile = false;
let pageIndex = 0;
const itemsPerPage = constant.take;

//on load 
window.addEventListener("load", async () => {
    try {
        const res = await HTTP.get("/auth/userInfo");
        const resBookdata = await HTTP.get(`books/user?skip=${pageIndex}&take=${itemsPerPage}`);
        if (res.status === 200 && resBookdata.status === 200) {
            
            userNameElement.textContent = res.data.user_name;
            emailElement.textContent = res.data.email;
            const bookItem = resBookdata.data;
            renderUserUploads(bookItem);
        }
    } catch (error) {
        // window.location.replace("/src/view/login/login.html");
    }
});

//eventlistner to nav profile
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

//eventlistner to the logout button
logoutElement.addEventListener("click", async () => {
    const result = await logout();
    if (result) {
        window.location.replace("/src/view/login/login.html");
    }
});

//eventlistner to upload page
uploadPageBtn.addEventListener("click", () => {
    window.location.href = "/src/view/upload/upload.html";
});

//eventlistner to pagination
nextElement.addEventListener("click", () => {
    getnextIndexBook();
});

prevElement.addEventListener("click", () => {
    getPrevIndexBook();
});

async function getnextIndexBook() {
    pageIndex += itemsPerPage;
    prevElement.style.display = "block";
    const res = await HTTP.get(`/books/user?take=${itemsPerPage}&skip=${pageIndex}`);
    console.log(res.data);
    renderUserUploads(res.data);
    if (!res.data[0]) {
        pageIndex = 0;
        const res = await HTTP.get(`/books/user?take=${itemsPerPage}&skip=${pageIndex}`);
        renderUserUploads(res.data);
    }
}

async function getPrevIndexBook() {
    if (pageIndex <= itemsPerPage ) {
        prevElement.style.display = "none";
    }
    pageIndex -= itemsPerPage;
    const res = await HTTP.get(`/books/user?take=${itemsPerPage}&skip=${pageIndex}`);
    console.log(res.data);
    renderUserUploads(res.data);
}
