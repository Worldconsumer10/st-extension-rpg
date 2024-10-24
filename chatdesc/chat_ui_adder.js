const extensionName = "st-extension-rpg";
const extensionFolderPath = `scripts/extensions/third-party/${extensionName}`;
import { extension_settings, getContext } from "../../../../extensions.js";
import { 
    saveSettingsDebounced,
    event_types,
    eventSource, 
} from "../../../../../script.js";

eventSource.on(event_types.CHAT_CHANGED,function(){
    var messages = $('.mes')
    var mess_sel = {}
    const user = getContext().name1
    const ai = getContext().name2
    for (let i = 0; i < messages.length; i++) {
        const element = $(messages[i]);
        const messageSender = element.find(".name_text")[0].innerText
        if (messageSender != "System"){
            mess_sel[messageSender] = element
        }
        const previousRPG = element.find("#rpg_element")
        if (previousRPG != null){
            $(previousRPG).remove()
        }
    }
    for (const key in mess_sel) {
        if (Object.prototype.hasOwnProperty.call(mess_sel, key)) {
            const element = mess_sel[key];
            const addHTML = $(`<small id="rpg_element">HP: 100/100</small>`)
            $(element).prepend(addHTML)
        }
    }
})

function addChat(){
    jQuery(async()=>{
        if (typeof(extension_settings[extensionName]) == "undefined")
        {extension_settings[extensionName]={}; saveSettingsDebounced()}
    })
}
export {
    addChat
}