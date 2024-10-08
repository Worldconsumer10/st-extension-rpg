const extensionName = "st-extension-rpg";
const extensionFolderPath = `scripts/extensions/third-party/${extensionName}`;

import { addDropdown } from "./advancedRPGHandler.js"
import {init} from "./attributeHandler.js"

jQuery(()=>{
    addDropdown()
    init()
})