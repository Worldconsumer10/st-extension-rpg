import { getCharacterName } from "./characterHelper.js";
import { extension_settings, getContext } from "../../../extensions.js";
import { saveSettingsDebounced } from "../../../../script.js";

const extensionName = "st-extension-rpg";
const extensionFolderPath = `scripts/extensions/third-party/${extensionName}`;


jQuery(async ()=>{
    if (typeof(extension_settings[extensionName]) == "undefined")
    {extension_settings[extensionName]={}; saveSettingsDebounced()}
    const element = await $.get(`${extensionFolderPath}/advancedTabRPG.html`);
    const element2 = await $.get(`${extensionFolderPath}/rpgEntry.html`);
    $("#character_popup").children().eq(4).after(element)
    $("#rpg_data_content").append(element2)
    $('#advanced_rpg_add_element').on('click', function() {
        const charName = getCharacterName()
        const template = $('#entryTemplate');
        const newEntry = template.clone().show(); // Clone and show the entry
        function getChatId()
        {
            const context = getContext()
            console.log(context)
        }

        // Attribute storage method:
        // Defaults are defined when the user clicks the saveDefault button (using newEntry.find('.saveDefault'))
        // All items are saved in chatProperties unless the user clicks Save Default

        if (typeof(extension_settings[extensionName][charName]) == "undefined")
        {
            extension_settings[extensionName][charName] = {
                defaults:[],
                chatProperties:[]
            }
            saveSettingsDebounced()
        }


        newEntry.find('.removeEntry').on('click', function() {
            newEntry.remove(); // Remove the entry when the remove button is clicked
        });
        // Add input listener to only allow numbers in the max_value field
        newEntry.find('.max_value').on('input', function() {
            getChatId()
            // Get the current value and replace non-digit characters
            const value = $(this).val().replace(/\D/g, '');
            $(this).val(value); // Set the filtered value back to the input
        });
        $('#entriesContainer').append(newEntry); // Append the new entry

    });
})