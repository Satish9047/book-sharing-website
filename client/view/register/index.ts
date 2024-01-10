import HTTP from "../../src/config";
const registerElement = document.getElementById("registerBtn") as HTMLButtonElement;
const userNameElement = document.getElementById("userName") as HTMLButtonElement;
const emailElement = document.getElementById("email") as HTMLButtonElement;
const passwordElement = document.getElementById("password") as HTMLButtonElement;

registerElement.addEventListener("click", async (e) => {
    e.preventDefault();
    const userName = userNameElement.value;
    const email = emailElement.value;
    const password = passwordElement.value;
    console.log({ userName: userName, email: email, password: password });

    try {
        const res = await HTTP.post("/auth/register", {
            userName,
            email,
            password,
        });
        console.log(res,"respond from server");
        if(res.status === 200){
            window.location.href = "../login/login.html";
        }
    } catch (error) {
        console.log(error, "error from server");
    }
});