const extensionName = "st-extension-rpg";
const extensionFolderPath = `scripts/extensions/third-party/${extensionName}`;
import { extension_settings, getContext } from "../../../../extensions.js";
import { 
    saveSettingsDebounced,
    event_types,
    eventSource, 
} from "../../../../../script.js";

eventSource.on(event_types.CHAT_CHANGED, debouncedRender);
eventSource.on(event_types.CHARACTER_MESSAGE_RENDERED, debouncedRender);
eventSource.on(event_types.IMPERSONATE_READY, debouncedRender);
eventSource.on(event_types.MESSAGE_DELETED, debouncedRender);

eventSource.on(event_types.CHAT_CHANGED,debouncedRender)

async function debouncedRender(){
    // Remove all previously added rpg_element elements
    $(".rpg_element").remove(); 

    var messages = $('.mes');
    var mess_sel = {};
    
    // Select messages that aren't from the System
    for (let i = 0; i < messages.length; i++) {
        const element = $(messages[i]);
        const messageSender = element.find(".name_text")[0].innerText;
        if (messageSender != "System"){
            mess_sel[messageSender] = element;
        }
    }

    // Add RPG elements to selected messages
    for (const key in mess_sel) {
        if (Object.prototype.hasOwnProperty.call(mess_sel, key)) {
            const element = mess_sel[key];
            $(element).prepend($(`<small class="rpg_element">NOT IMPLEMENTED</small>`));
        }
    }
}

function addChat(){
    jQuery(async()=>{
        if (typeof(extension_settings[extensionName]) == "undefined")
        {extension_settings[extensionName]={}; saveSettingsDebounced()}
    })
}
export {
    addChat
}