import HTTP from "../../config";
const registerElement = document.getElementById("registerBtn") as HTMLButtonElement;
const userNameElement = document.getElementById("userName") as HTMLButtonElement;
const emailElement = document.getElementById("email") as HTMLButtonElement;
const passwordElement = document.getElementById("password") as HTMLButtonElement;
const registerDivElement = document.getElementById("register") as HTMLDivElement;

registerElement.addEventListener("click", async (e) => {
    e.preventDefault();
    const userName = userNameElement.value;
    const email = emailElement.value;
    const password = passwordElement.value;
    //console.log({ userName: userName, email: email, password: password });

    try {
        const res = await HTTP.post("/auth/register", {
            userName,
            email,
            password,
        });
        if (res.status === 201) {
            console.log(res.data.msg);
            window.location.replace("/src/view/login/login.html");
        }
    } catch (error) {
        console.log(error);

        const div = document.createElement("div") as HTMLElement;
        const paragraph = document.createElement("p") as HTMLElement;
        div.classList.add("errorColor", "p-2", "rounded-md", "shadow-md");

        div.appendChild(paragraph);
        paragraph.innerText = error.response.data.error;
        registerDivElement.appendChild(div);
        
        setTimeout(() => {
            registerDivElement.removeChild(div);
        }, 3000);
    }
});