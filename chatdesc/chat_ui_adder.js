const extensionName = "st-extension-rpg";
const extensionFolderPath = `scripts/extensions/third-party/${extensionName}`;
import { extension_settings, getContext } from "../../../../extensions.js";
import { 
    saveSettingsDebounced,
    event_types,
    eventSource, 
} from "../../../../../script.js";

const forChatRender = updateChatDisplay

eventSource.on(event_types.CHAT_CHANGED,updateChatDisplay)

function updateChatDisplay(){
    for (let i = 0; i < $(".rpg_element").length; i++) {
        try{
            const element = $(messages[i]);
            element.remove()
        }catch(e){}
    }
    var messages = $('.mes')
    var mess_sel = {}
    for (let i = 0; i < messages.length; i++) {
        const element = $(messages[i]);
        const messageSender = element.find(".name_text")[0].innerText
        if (messageSender != "System"){
            mess_sel[messageSender] = element
        }
    }
    for (const key in mess_sel) {
        if (Object.prototype.hasOwnProperty.call(mess_sel, key)) {
            const element = mess_sel[key];
            const addHTML = $(`<small class="rpg_element">HP: 100/100</small>`)
            $(element).prepend(addHTML)
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
    addChat,
    forChatRender
}