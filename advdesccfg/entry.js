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
    jQuery(async()=>{
        if (typeof(extension_settings[extensionName]) == "undefined")
        {extension_settings[extensionName]={}; saveSettingsDebounced()}
        const element = await $.get(`${extensionFolderPath}/advdesccfg/char_data.html`);
        const attributeElement = await $.get(`${extensionFolderPath}/advdesccfg/attribute.html`);
        $("#persona-management-block").children().eq(2).append(element);
        $("#character_popup").children().eq(4).after(element)
        $(".add_char_attribute").on("click",function(){
            $("#rpg_topcontent_tab").append(attributeElement)
        })
        //Tab to add contents: $("#rpg_topcontent_tab")
    })
}
export {
    addAdvDesc
}