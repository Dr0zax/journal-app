import { displayPrompt, displayQuote, displayEntriesOnDash, setHeaderFooter, getLocalStorage } from "./utils.mjs"; 
import { setupSettingsMenu } from "./settings-menu.mjs";

function init() {
    displayQuote();
    displayPrompt();
    displayEntriesOnDash();
    setHeaderFooter();
    setupSettingsMenu();
}


window.addEventListener("load", () => init())