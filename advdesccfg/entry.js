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

        $(".add_char_attribute").on("click", function() {
            const newAttributeElement = $(attributeElementTemplate).clone();
            $("#rpg_topcontent_tab").append(newAttributeElement);
            newAttributeElement.find("#removeButton").on("click", function() {
                newAttributeElement.remove();
            });
            newAttributeElement.find("#saveButton").on("click", function() {
                const username = getUserName()

                if (typeof(extension_settings[extensionName]["attributes"]) == "undefined")
                {extension_settings[extensionName]["attributes"]={}}
                if (typeof(extension_settings[extensionName]["attributes"][username]) == "undefined")
                {extension_settings[extensionName]["attributes"][username]=[]}

                const attributeName = newAttributeElement.find("#att_name").text()
                const attributeValue = newAttributeElement.find("#att_val").text()

                extension_settings[extensionName]["attributes"][username].push({
                    name:attributeName,
                    value:attributeValue
                })
                saveSettingsDebounced()
                newAttributeElement.find("#att_saved").text("🟢 Saved")
            });
        });
    });
}
export {
    addAdvDesc
}