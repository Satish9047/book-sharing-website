
// import axios from "axios";
import HTTP from "../../src/config";

const emailElement = document.getElementById("email") as HTMLInputElement;
const passwordElement = document.getElementById("password") as HTMLInputElement;
const loginBtn = document.getElementById("loginBtn") as HTMLButtonElement;

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
        //console.log(res,"respond from server");
        if(res.status === 200){
            window.location.href = "../../index.html";
        }
        
    } catch (error) {
        if(error.response.status === 400){
            console.log(error.response.data.err);
        }
    }
});
