import { register, setHeaderFooter } from "./utils.mjs";
import { setupSettingsMenu } from "./settings-menu.mjs";

const regitserForm = document.querySelector("#register");

regitserForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.querySelector("#username").value;
    const password = document.querySelector("#password").value;
    const passwordRepeat = document.querySelector("#password-repeat").value;

    if (password == passwordRepeat) {
        register(username, password)
        regitserForm.reset();
        window.location.href = "/login.html";
    }
})


setHeaderFooter()
setupSettingsMenu();