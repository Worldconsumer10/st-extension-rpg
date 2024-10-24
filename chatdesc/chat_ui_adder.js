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
    console.log(messages)
    const user = getContext().name1
    const ai = getContext().name2
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