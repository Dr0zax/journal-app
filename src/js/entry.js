import { setHeaderFooter, displayEntry, getParam } from "./utils.mjs";
import { setupSettingsMenu } from "./settings-menu.mjs";

const id = getParam("id");

displayEntry(id);
setHeaderFooter();
setupSettingsMenu();