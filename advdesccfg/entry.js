const extensionName = "st-extension-rpg";
const extensionFolderPath = `scripts/extensions/third-party/${extensionName}`;
import { extension_settings, getContext } from "../../../../extensions.js";
import { 
    saveSettingsDebounced,
    event_types,
    eventSource, 
} from "../../../../../script.js";

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

        // Event to add new attribute element when clicked
        $(".add_char_attribute").on("click", function() {
            // Clone the attributeElement to avoid modifying the original template
            const newAttributeElement = $(attributeElementTemplate).clone();

            // Append the cloned element to the tab content
            $("#rpg_topcontent_tab").append(newAttributeElement);

            // Add click handler for the remove button within the cloned element
            newAttributeElement.find("#removeButton").on("click", function() {
                newAttributeElement.remove();
            });
        });
    });
}
export {
    addAdvDesc
}