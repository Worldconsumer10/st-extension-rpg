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
        const previousRPG = element.find("#rpg_elements")
        if (previousRPG != null){
            $(previousRPG).remove()
        }
    }
    mess_sel.forEach(element => {
        const data = `<small>this is test text</small>`
        $(element).prepend($(data))
    });
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