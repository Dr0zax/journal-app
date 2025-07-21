import { setLocalStorage } from "./utils.mjs";

export function setupSettingsMenu() {
    let settingsContainer = document.querySelector("#settings-container");
    let settingsBar = settingsContainer.querySelector(".settings-bar");
    let settingsOpenBttn = document.querySelector("#settings-bttn");
    let settingsCloseBttn = document.querySelector("#settings-bttn-close");

    let dateEl = document.querySelector("#todays-date")

    settingsOpenBttn.addEventListener("click", () => {
        settingsContainer.classList.toggle("hide");
        settingsBar.classList.toggle("show");
        dateEl.classList.toggle("date-adjust");
    })
    
    settingsCloseBttn.addEventListener("click", () => {
        settingsBar.classList.toggle("show");
        settingsContainer.classList.toggle("hide");
        dateEl.classList.toggle("date-adjust");
    })
}

