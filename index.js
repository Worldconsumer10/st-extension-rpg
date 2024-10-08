const extensionName = "st-extension-rpg";
const extensionFolderPath = `scripts/extensions/third-party/${extensionName}`;

import { addDropdown } from `${extensionFolderPath}/advancedRPGHandler`

jQuery(()=>{
    addDropdown()
})