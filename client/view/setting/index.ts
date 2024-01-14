import { AxiosError } from "axios";
import HTTP from "../../src/config";
import { sendRefreshRequest } from "../../src/utils/utils";

// onload
window.addEventListener("load", async () => {
    try {
        const res = await HTTP.get("/auth/userInfo");
        console.log(res);
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

document.addEventListener("DOMContentLoaded", () => {
    const oldPasswordInput = document.getElementById("old-Password") as HTMLInputElement;
    const newPasswordInput = document.getElementById("new-password") as HTMLInputElement;
    const confirmPasswordInput = document.getElementById("confirm-Password") as HTMLInputElement;
    const changePasswordBtn = document.getElementById("change-btn") as HTMLButtonElement;
    const settingElement = document.getElementById("setting") as HTMLElement;

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
                window.location.replace("../../index.html");
            }
            console.log(res);
        } catch (error) {
            console.log(error);
            const div = document.createElement("div") as HTMLElement;
            div.classList.add("p-2", "errorColor", "rounded-md", "shadow-md");
            // div.style.backgroundColor = "red";
            const paragraph = document.createElement("p") as HTMLElement;
            div.appendChild(paragraph);
            paragraph.innerText = error.response.data.error;
            settingElement.appendChild(div);
            setTimeout(() => {
                settingElement.removeChild(div);
            }, 3000);
        }
    });
});
