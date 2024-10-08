const extensionName = "st-extension-rpg";
const extensionFolderPath = `scripts/extensions/third-party/${extensionName}`;

import { addDropdown } from "./advancedRPGHandler.js"

jQuery(()=>{
    addDropdown()
})