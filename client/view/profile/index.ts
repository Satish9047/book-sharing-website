// import { IBook } from "./../../src/interface/book";
import { AxiosError } from "axios";
import HTTP from "../../src/config";
import {logout, renderUserUploads, sendRefreshRequest} from "../../src/utils/utils";

// const profileImgElement = document.getElementById("profileImg") as HTMLImageElement;
// const bookItemElement = document.getElementById("bookList") as HTMLDivElement;
const uploadPageBtn = document.getElementById("uploadPageBtn") as HTMLButtonElement;
const userNameElement = document.getElementById("userName") as HTMLHeadingElement;
const emailElement = document.getElementById("email") as HTMLHeadingElement;
const navAvatar = document.getElementById("navAvatar") as HTMLElement;
const avatarDiv = document.getElementById("avatarDiv") as HTMLDivElement;
const logoutElement = document.getElementById("logout") as HTMLElement;
const prevElement = document.getElementById("prev") as HTMLDivElement;
const nextElement = document.getElementById("next") as HTMLDivElement;
// const settingElement = document.getElementById("setting") as HTMLDivElement;

//avatar state
let isProfile = false;
let pageIndex = 0;
const itemsPerPage = 2;

//on load 
window.addEventListener("load", async () => {
    try {
        const res = await HTTP.get("/auth/userInfo");
        const resBookdata = await HTTP.get(`books/user?skip=${pageIndex}&take=${itemsPerPage}`);
        if (res.status === 200 && resBookdata.status === 200) {
            console.log(res.data);
            console.log(resBookdata.data);
            //userId = res.data.user_id;
            userNameElement.textContent = res.data.user_name;
            emailElement.textContent = res.data.email;
            const bookItem = resBookdata.data;
            renderUserUploads(bookItem);
        }
    } catch (error) {
        console.log(error);
        if (
            (error as AxiosError).response &&(error as AxiosError).response?.status === 401) {
            try {
                const result = await sendRefreshRequest();
                if (!result) {
                    window.location.replace("../login/login.html");
                }
            } catch (error) {
                console.log(error);
            }
        }else{
            window.location.replace("../login/login.html");
        } 
    }
});

//eventlistner to nav profile
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

//eventlistner to the logout button
logoutElement.addEventListener("click", async () => {
    const result =  await logout();
    if (result) {
        window.location.replace("../login/login.html");
    }
});

//eventlistner to upload page
uploadPageBtn.addEventListener("click", () => {
    window.location.href = "../upload/upload.html";
});

//eventlistner to pagination
nextElement.addEventListener("click", () => {
    getnextIndexBook();
});

prevElement.addEventListener("click", () => {
    getPrevIndexBook();
});

async function getnextIndexBook() {
    pageIndex += 2;
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
    if (pageIndex <= itemsPerPage) {
        prevElement.style.display = "none";
    }
    pageIndex -= 2;
    const res = await HTTP.get(`/books/user?take=${itemsPerPage}&skip=${pageIndex}`);
    console.log(res.data);
    renderUserUploads(res.data);
}
