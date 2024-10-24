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
        // Select the element to observe
        const targetElement = document.getElementById('your_name');

        // Create a new observer instance
        const observer = new MutationObserver(function(mutationsList) {
            for (let mutation of mutationsList) {
                console.log(mutation)
                if (mutation.type == 'attributes' && mutation.attributeName == 'value') {
                    $("#rpg_topcontent_tab").empty()
                    if (
                        typeof(extension_settings[extensionName]["attributes"]) !== "undefined" &&
                        typeof(extension_settings[extensionName]["attributes"][getUserName()]) !== "undefined"
                    ) {
                        const username = getUserName();
                        const userAttributes = extension_settings[extensionName]["attributes"][username];
                    
                        for (const key in userAttributes) {
                            if (Object.prototype.hasOwnProperty.call(userAttributes, key)) {
                                const element = userAttributes[key]; // 'element' is the value of the attribute
                    
                                // Ensure that the key and element are valid before proceeding
                                if (key && element) {
                                    const newAttributeElement = $(attributeElementTemplate).clone();
                    
                                    // Append the cloned attribute element to the tab
                                    $("#rpg_topcontent_tab").append(newAttributeElement);
                    
                                    // Set the values of the attribute elements based on the stored data
                                    newAttributeElement.find("#att_name").val(key);    // Set the attribute name (key)
                                    newAttributeElement.find("#att_val").val(element); // Set the attribute value (element)
                                    newAttributeElement.find("#att_saved").text("🔵 Loaded");
                    
                                    // Remove button functionality
                                    newAttributeElement.find("#removeButton").on("click", function () {
                                        newAttributeElement.remove();
                    
                                        // Ensure the settings structure is initialized before removal
                                        if (typeof(extension_settings[extensionName]["attributes"]) == "undefined") {
                                            extension_settings[extensionName]["attributes"] = {};
                                        }
                                        if (typeof(extension_settings[extensionName]["attributes"][username]) == "undefined") {
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
                    }
                }
            }
        });

        // Start observing the target element for attribute changes
        observer.observe(targetElement, { attributes: true });


        if (typeof(extension_settings[extensionName]) == "undefined") {
            extension_settings[extensionName] = {}; 
            saveSettingsDebounced();
        }

        const element = await $.get(`${extensionFolderPath}/advdesccfg/char_data.html`);
        const attributeElementTemplate = await $.get(`${extensionFolderPath}/advdesccfg/attribute.html`);

        // Add element to persona-management block and character_popup
        $("#persona-management-block").children().eq(1).append(element);
        $("#character_popup").children().eq(4).after(element);

        console.log(extension_settings[extensionName]["attributes"])
        if (
            typeof(extension_settings[extensionName]["attributes"]) !== "undefined" &&
            typeof(extension_settings[extensionName]["attributes"][getUserName()]) !== "undefined"
        ) {
            const username = getUserName();
            const userAttributes = extension_settings[extensionName]["attributes"][username];
        
            for (const key in userAttributes) {
                if (Object.prototype.hasOwnProperty.call(userAttributes, key)) {
                    const element = userAttributes[key]; // 'element' is the value of the attribute
        
                    // Ensure that the key and element are valid before proceeding
                    if (key && element) {
                        const newAttributeElement = $(attributeElementTemplate).clone();
        
                        // Append the cloned attribute element to the tab
                        $("#rpg_topcontent_tab").append(newAttributeElement);
        
                        // Set the values of the attribute elements based on the stored data
                        newAttributeElement.find("#att_name").val(key);    // Set the attribute name (key)
                        newAttributeElement.find("#att_val").val(element); // Set the attribute value (element)
                        newAttributeElement.find("#att_saved").text("🔵 Loaded");
        
                        // Remove button functionality
                        newAttributeElement.find("#removeButton").on("click", function () {
                            newAttributeElement.remove();
        
                            // Ensure the settings structure is initialized before removal
                            if (typeof(extension_settings[extensionName]["attributes"]) == "undefined") {
                                extension_settings[extensionName]["attributes"] = {};
                            }
                            if (typeof(extension_settings[extensionName]["attributes"][username]) == "undefined") {
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
        }

        $(".add_char_attribute").on("click", function() {
            const newAttributeElement = $(attributeElementTemplate).clone();
            $("#rpg_topcontent_tab").append(newAttributeElement);
        
            newAttributeElement.find("#removeButton").on("click", function() {
                newAttributeElement.remove();
                const username = getUserName()
                
                // Ensure the settings structure is initialized before removal
                if (typeof(extension_settings[extensionName]["attributes"]) === "undefined") {
                    extension_settings[extensionName]["attributes"] = {};
                }
                if (typeof(extension_settings[extensionName]["attributes"][username]) === "undefined") {
                    extension_settings[extensionName]["attributes"][username] = {};
                }
                const attributeName = newAttributeElement.find("#att_name").val()
                
                // Remove the attribute from the settings
                delete extension_settings[extensionName]["attributes"][username][attributeName];
                
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