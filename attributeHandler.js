import { getCharacterName } from "./characterHelper.js";
import { extension_settings, getContext } from "../../../extensions.js";
import { saveSettingsDebounced } from "../../../../script.js";
const extensionName = "st-extension-rpg";
export function init(){
    $("#advanced_rpg_add_element").on('click',function(){
        // the user has added an element!
        const charName = getCharacterName()
        if (typeof(extension_settings[extensionName]) == "undefined")
        {extension_settings[extensionName]={}}
        const template = $('#entryTemplate');
        const newEntry = template.clone();
        newEntry.style.display = ''; // Show the cloned entry

        // Add functionality to remove entry
        newEntry.querySelector('.removeEntry').addEventListener('click', function() {
            newEntry.remove();
        });
        newEntry.querySelector(".max_value").addEventListener('input', function() {
            // Get the current value
            let value = newEntry.querySelector('.max_value').value;

            // Replace any non-digit characters
            value = value.replace(/\D/g, '');

            // Update the input field with the filtered value
            newEntry.querySelector('.max_value').value = value;
        });

        console.log(getContext().chat)
        $('#entriesContainer').append(newEntry);
        if (typeof(extension_settings[extensionName][charName]) == "undefined")
        {
            extension_settings[extensionName][charName]={
                defaults:[newEntry],
                chat_properties:{}
            }
        } else {
            // extension_settings[extensionName][charName] = {
            //     entry:newEntry
            // }
        }
        saveSettingsDebounced()
    })
}