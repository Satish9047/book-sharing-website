// import axios from "axios";
import { AxiosResponse } from "axios";
import HTTP from "../../config";

const emailElement = document.getElementById("email") as HTMLInputElement;
const passwordElement = document.getElementById("password") as HTMLInputElement;
const loginBtn = document.getElementById("loginBtn") as HTMLButtonElement;
const loginElement = document.getElementById("login") as HTMLBodyElement;

loginBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    const email = emailElement.value;
    const password = passwordElement.value;
    console.log({ email: email, password: password });

    try {
        const res: AxiosResponse = await HTTP.post("/auth/login", {
            email,
            password,
        });
        
        if (res.status === 200) {
            window.location.href = "/index.html";
        }
    } catch (error) {
        console.log(error, "from me");

        const div = document.createElement("div") as HTMLElement;
        div.classList.add("p-2", "errorColor", "rounded-md", "shadow-md");
        const paragraph = document.createElement("p") as HTMLElement;
        div.appendChild(paragraph);
        paragraph.innerText = error.response.data.error;

        loginElement.appendChild(div);

        setTimeout((): void => {
            loginElement.removeChild(div);
        }, 3000);
    }
});
