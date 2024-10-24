const extensionName = "st-extension-rpg";
const extensionFolderPath = `scripts/extensions/third-party/${extensionName}`;
import { extension_settings, getContext } from "../../../../extensions.js";
import { 
    saveSettingsDebounced,
    event_types,
    eventSource, 
} from "../../../../../script.js";
import {getCharacterName,getUserName} from "./../characterHelper.js"

eventSource.on(event_types.CHAT_CHANGED,function(){
    const context = getContext()
    if (context.name2 == "")
    {
        toastr.error('Groups are not supported currently.','[RPG CHARACTERS]\nNOT IMPLEMENTED')
        return;
    }
})

function addAdvDesc(){
    jQuery(async () => {
        if (typeof(extension_settings[extensionName]) == "undefined") {
            extension_settings[extensionName] = {}; 
            saveSettingsDebounced();
        }

        const element = await $.get(`${extensionFolderPath}/advdesccfg/char_data.html`);
        const attributeElementTemplate = await $.get(`${extensionFolderPath}/advdesccfg/attribute.html`);

        // Add element to persona-management block and character_popup
        $("#persona-management-block").children().eq(1).append(element);
        $("#character_popup").children().eq(4).after(element);

        if (
            typeof(extension_settings[extensionName]["attributes"]) !== "undefined" &&
            typeof(extension_settings[extensionName]["attributes"][getUserName()]) !== "undefined"
        ) {
            const username = getUserName();
            
            for (const key in extension_settings[extensionName]["attributes"][username]) {
                if (Object.prototype.hasOwnProperty.call(extension_settings[extensionName]["attributes"][username], key)) {
                    const element = extension_settings[extensionName]["attributes"][username][key];
                    const newAttributeElement = $(attributeElementTemplate).clone();
                    
                    // Append the cloned attribute element to the tab
                    $("#rpg_topcontent_tab").append(newAttributeElement);
                    
                    // Set the values of the attribute elements based on the stored data
                    newAttributeElement.find("#att_name").val(key);
                    newAttributeElement.find("#att_val").val(element);
                    newAttributeElement.find("#att_saved").text("🔵 Loaded");
                    
                    // Remove button functionality
                    newAttributeElement.find("#removeButton").on("click", function () {
                        newAttributeElement.remove();
                        
                        // Ensure the settings structure is initialized before removal
                        if (typeof(extension_settings[extensionName]["attributes"]) === "undefined") {
                            extension_settings[extensionName]["attributes"] = {};
                        }
                        if (typeof(extension_settings[extensionName]["attributes"][username]) === "undefined") {
                            extension_settings[extensionName]["attributes"][username] = {};
                        }
                        
                        // Remove the attribute from the settings
                        delete extension_settings[extensionName]["attributes"][username][key];
                        
                        // Save the updated settings
                        saveSettingsDebounced();
                    });
                    
                    // Remove the save button since this attribute is already loaded
                    newAttributeElement.find("#saveButton").remove();
                }
            }
        }

        $(".add_char_attribute").on("click", function() {
            const newAttributeElement = $(attributeElementTemplate).clone();
            $("#rpg_topcontent_tab").append(newAttributeElement);
        
            newAttributeElement.find("#removeButton").on("click", function() {
                newAttributeElement.remove();
                
                // Ensure the settings structure is initialized before removal
                if (typeof(extension_settings[extensionName]["attributes"]) === "undefined") {
                    extension_settings[extensionName]["attributes"] = {};
                }
                if (typeof(extension_settings[extensionName]["attributes"][username]) === "undefined") {
                    extension_settings[extensionName]["attributes"][username] = {};
                }
                
                // Remove the attribute from the settings
                delete extension_settings[extensionName]["attributes"][username][key];
                
                // Save the updated settings
                saveSettingsDebounced();
            });
            newAttributeElement.find("#saveButton").on("click", function() {
                const username = getUserName()

                if (typeof(extension_settings[extensionName]["attributes"]) == "undefined")
                {extension_settings[extensionName]["attributes"]={}}
                if (typeof(extension_settings[extensionName]["attributes"][username]) == "undefined")
                {extension_settings[extensionName]["attributes"][username]={}}
                const attributeName = newAttributeElement.find("#att_name").val()
                const attributeValue = newAttributeElement.find("#att_val").val()
                console.log(attributeName,attributeValue)

                extension_settings[extensionName]["attributes"][username][attributeName] = attributeValue
                saveSettingsDebounced()
                newAttributeElement.find("#att_saved").text("🟢 Saved")
            });
        });
    });
}
export {
    addAdvDesc
}