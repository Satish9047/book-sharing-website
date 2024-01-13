import HTTP from "../../src/config";

const oldPasswordInput = document.getElementById("old-Password") as HTMLInputElement;
const newPasswordInput = document.getElementById("new-Password") as HTMLInputElement;
const confirmPasswordInput = document.getElementById("confirm-Password") as HTMLInputElement;
const changePasswordBtn = document.getElementById("change-btn") as HTMLButtonElement;
const settingElement = document.getElementById("setting") as HTMLDivElement;

window.addEventListener("load", ()=>{

});

changePasswordBtn.addEventListener("click", async()=>{
    const oldPassword = oldPasswordInput.value;
    const newPassword = newPasswordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    
    try {
        const res = await HTTP.post("auth/change-password");
        console.log(res);

        
    } catch (error) {
        console.log(error.response.data);
        const div = document.createElement("div") as HTMLElement;
        div.classList.add("p-2","errorColor", "rounded-md", "shadow-md");
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