import { AxiosError } from "axios";
import HTTP from "../../config";

const oldPasswordInput = document.getElementById("old-Password") as HTMLInputElement;
const newPasswordInput = document.getElementById("new-password") as HTMLInputElement;
const confirmPasswordInput = document.getElementById("confirm-Password") as HTMLInputElement;
const changePasswordBtn = document.getElementById("change-btn") as HTMLButtonElement;
const settingElement = document.getElementById("setting") as HTMLElement;

// onload
window.addEventListener("load", async () => {
    try {
        const res = await HTTP.get("/auth/userInfo");
        console.log(res);
    } catch (error) {
        console.log(error);
    }
});


//change password btn listner
changePasswordBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    const oldPassword = oldPasswordInput.value;
    const newPassword = newPasswordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    console.log(oldPassword, newPassword, confirmPassword);

    try {
        if (newPassword !== oldPassword) {
            if (newPassword !== confirmPassword) {
                throw new Error("confirm password didn't match");
            }
        }

        const res = await HTTP.post("/auth/changePassword", {
            oldPassword,
            newPassword,
        });

        if (res.status === 200) {

            const div = document.createElement("div") as HTMLElement;
            div.classList.add("p-2", "successColor", "shadow-md", "rounded-md");
            const paragraph = document.createElement("p") as HTMLElement;
            div.appendChild(paragraph);
            paragraph.innerText = "password change successfull";
            settingElement.appendChild(div);

            setTimeout(() => {
                settingElement.removeChild(div);

            }, 3000);
            window.location.replace("/index.html");
        }
        console.log(res);
    } catch (error) {
        if(error instanceof AxiosError){
            console.log(error);
            const div = document.createElement("div") as HTMLElement;
            div.classList.add("p-2", "errorColor", "rounded-md", "shadow-md");
            const paragraph = document.createElement("p") as HTMLElement;
            div.appendChild(paragraph);
            paragraph.innerText = error.response?.data.error;
            settingElement.appendChild(div);
            setTimeout(() => {
                settingElement.removeChild(div);
            }, 3000);
        }
    }
});

