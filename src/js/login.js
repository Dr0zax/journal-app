import { login, setHeaderFooter } from "./utils.mjs";
import { setupSettingsMenu } from "./settings-menu.mjs";

const loginForm = document.querySelector("#login")

loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.querySelector("#username").value;
    const password = document.querySelector("#password").value;

    login(username, password);
    
    loginForm.reset();
    // window.location.href = "/index.html";
})

setHeaderFooter()
setupSettingsMenu()