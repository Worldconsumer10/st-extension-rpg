import { getCharacterName } from "./characterHelper.js";
import { extension_settings, getContext } from "../../../extensions.js";
import { saveSettingsDebounced } from "../../../../script.js";
const extensionName = "st-extension-rpg";
export function init(){
    $("#advanced_rpg_add_element").on('click',function(){
        // the user has added an element!
        const charName = getCharacterName()
        console.log(charName)
    })
}