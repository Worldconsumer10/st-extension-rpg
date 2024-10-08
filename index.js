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
        const charName = getCharacterName();
        const template = $('#entryTemplate');
        const newEntry = template.clone().show();
    
        function getChatId() {
            return getContext().chatId;
        }
    
        // Attribute storage method
        if (typeof(extension_settings[extensionName][charName]) == "undefined") {
            extension_settings[extensionName][charName] = {
                defaults: [],
                chatProperties: []
            };
            saveSettingsDebounced();
        }
    
        newEntry.find('.removeEntry').on('click', function() {
            newEntry.remove(); // Remove the entry when the remove button is clicked
        });
    
        function saveData(isDefault){
            const triggerWords = newEntry.find('.trigger_keywords').val().trim();
            const attribute = newEntry.find('.attribute_word').val().trim();
            const maxValue = newEntry.find('.max_value').val().trim() || '0';
            const chatId = getChatId();
            const currentData = {
                isDefault: isDefault,
                triggerWords: triggerWords,
                attribute: attribute,
                maxValue: maxValue,
                current: maxValue // Initial current value set to max value
            };
    
            // Check if chatProperties already has an entry for this chatId
            const existingProps = extension_settings[extensionName][charName].chatProperties.find(prop => prop.chatId === chatId);
            
            if (existingProps) {
                // Update existing entry
                Object.assign(existingProps, currentData);
            } else {
                // Add new entry
                extension_settings[extensionName][charName].chatProperties.push({
                    chatId: chatId,
                    ...currentData
                });
            }
    
            saveSettingsDebounced(); // Save settings
        }

        newEntry.find('.saveValues').on('click', function() {
            saveData(false)
        });
    
        newEntry.find('.saveDefault').on('click', function() {
            saveData(true)
            $(this).remove()
        });

        // Handle trigger keywords input
        newEntry.find('.trigger_keywords').on('input', function() {
            const triggerWords = $(this).val().trim();
            // You can add additional logic if needed
        });
    
        // Handle attribute input
        newEntry.find('.attribute_word').on('input', function() {
            const attribute = $(this).val().trim();
            // You can add additional logic if needed
        });
    
        // Add input listener to only allow numbers in the max_value field
        newEntry.find('.max_value').on('input', function() {
            const value = $(this).val().replace(/\D/g, ''); // Allow only digits
            $(this).val(value); // Set the filtered value back to the input
        });
    
        $('#entriesContainer').append(newEntry); // Append the new entry
    });    
})