import { AxiosError } from "axios";
import HTTP from "../../config";

//refrencing DOM in variables
const emailElement = document.getElementById("email") as HTMLInputElement;
const passwordElement = document.getElementById("password") as HTMLInputElement;
const loginBtn = document.getElementById("loginBtn") as HTMLButtonElement;
const loginElement = document.getElementById("login") as HTMLBodyElement;

//login btn handler
loginBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    const email = emailElement.value;
    const password = passwordElement.value;
    console.log({ email: email, password: password });

    try {
        const res = await HTTP.post("/auth/login", {
            email,
            password,
        });
        
        if (res.status === 200) {
            window.location.href = "/index.html";
        }
    } catch (error) {
        if(error instanceof AxiosError) {

            //error message
            const errorDiv = document.createElement("div") as HTMLElement;
            errorDiv.classList.add("p-2", "errorColor", "rounded-md", "shadow-md");
            const paragraph = document.createElement("p") as HTMLElement;
            errorDiv.appendChild(paragraph);
        
            paragraph.innerText = error.response?.data.error;
            loginElement.appendChild(errorDiv);

            setTimeout((): void => {
                loginElement.removeChild(errorDiv);
            }, 3000);
        }
    }
});
