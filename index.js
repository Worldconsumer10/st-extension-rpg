import { getCharacterName } from "./characterHelper.js";
import { extension_settings, getContext } from "../../../extensions.js";
import { 
    saveSettingsDebounced,
    event_types,
    eventSource, 
} from "../../../../script.js";
const extensionName = "st-extension-rpg";
const extensionFolderPath = `scripts/extensions/third-party/${extensionName}`;

function onCharAdvChanged(){
    setAttributeDisplay()
    addAttributes()
}

function generateIntercepted(chat){
    try{
        addAttributes()
    }catch{}
}
function setAttributeDisplay(){
    const username = getContext().name1
    const charname = getCharacterName()
    if (typeof(extension_settings[extensionName]) != "undefined"&& typeof(extension_settings[extensionName][username]) != "undefined")
    {
        const chatProperties = extension_settings[extensionName][username].chatProperties;
        $("#user_attribute_count").text(`${username}'s Attributes: ${chatProperties.length}`)
    } else {
        $("#user_attribute_count").text(`${username}'s Attributes: 0`)
    }
    if (typeof(extension_settings[extensionName]) != "undefined"&& typeof(extension_settings[extensionName][charname]) != "undefined")
    {
        const chatProperties = extension_settings[extensionName][charname].chatProperties;
        $("#char_attribute_count").text(`${charname}'s Attributes: ${chatProperties.length}`)
    } else {
        $("#char_attribute_count").text(`${charname}'s Attributes: 0`)
    }
}

window['rpgStats_generationInterceptor'] = generateIntercepted;
function addAttributes(){
    const messages = $(".mes"); // Select all messages with class "mes"
    const chatId = getContext().chatId
    const recentMessages = {}
    for (let i = 0; i < messages.length; i++) {
        const element = messages[i];
        const name = $(element).find('.name_text').text()
        if (!name.toLowerCase().includes("${characterName}".toLowerCase()))
            recentMessages[name] = element
    }
    console.log(recentMessages)
}
eventSource.on(event_types.CHAT_CHANGED, onCharAdvChanged);
jQuery(async ()=>{
    if (typeof(extension_settings[extensionName]) == "undefined")
    {extension_settings[extensionName]={}; saveSettingsDebounced()}
    const element = await $.get(`${extensionFolderPath}/advancedTabRPG.html`);
    const element2 = await $.get(`${extensionFolderPath}/rpgEntry.html`);
    $("#character_popup").children().eq(4).after(element)
    $("#rpg_data_content").append(element2)

    // Handle advanced selection changed
    
    const target = $('#character_popup-button-h3')[0];
    const observer = new MutationObserver(function(mutationsList, observer) {
        for (let mutation of mutationsList) {
            if (mutation.type === 'childList' || mutation.type === 'characterData') {
                onCharAdvChanged()
            }
        }
    });
    observer.observe(target, { characterData: true, childList: true, subtree: true });


    $('#advanced_rpg_add_element').on('click', function() {
        const charName = getCharacterName();
        const template = $('#entryTemplate');
        const newEntry = template.clone().show();
    
        function getChatId() {
            return getContext().chatId;
        }
    
        // Attribute storage method
        if (typeof(extension_settings[extensionName][charName]) == "undefined") {
            extension_settings[extensionName][charName] = {
                chatProperties: []
            };
            saveSettingsDebounced();
        }
    
        newEntry.find('.removeEntry').on('click', function() {
            newEntry.remove(); // Remove the entry when the remove button is clicked
        });
    
        function findDataFromAttribute(attribute){
            const username = getContext().name1
            const charName = getCharacterName(); // Get the current character name
            const chatId = getChatId(); // Get the current chat ID
            const forPlayer = Boolean(newEntry.find('.forUserCheckbox').val())
        
            var targetName = charName
            if (forPlayer){
                targetName = username
            }
            // Check if the character settings exist
            if (typeof extension_settings[extensionName][targetName] !== "undefined") {
                const chatProperties = extension_settings[extensionName][targetName].chatProperties;
        
                // Search for the matching attribute in the chatProperties
                for (let prop of chatProperties) {
                    if (prop.attribute === attribute && prop.chatId == chatId) {
                        return {
                            triggerWords: prop.triggerWords,
                            maxValue: prop.maxValue,
                            current: prop.current,
                            isDefault: prop.isDefault
                        };
                    }
                }
                for (let prop of chatProperties) {
                    if (prop.attribute === attribute) {
                        return {
                            triggerWords: prop.triggerWords,
                            maxValue: prop.maxValue,
                            current: prop.current,
                            isDefault: prop.isDefault
                        };
                    }
                }
            }
        
            // Return null or an empty object if no match is found
            return null;
        }

        function saveData(isDefault){
            const username = getContext().name1
            const triggerWords = newEntry.find('.trigger_keywords').val().trim();
            const attribute = newEntry.find('.attribute_word').val().trim();
            const maxValue = newEntry.find('.max_value').val().trim() || '0';
            const forPlayer = Boolean(newEntry.find('.forUserCheckbox').val())
            const chatId = getChatId();
            const currentData = {
                isDefault: isDefault,
                triggerWords: triggerWords,
                attribute: attribute,
                maxValue: maxValue,
                current: maxValue // Initial current value set to max value
            };
            var targetName = charName
            if (forPlayer){
                targetName = username
            }
            if (typeof(extension_settings[extensionName][targetName]) == "undefined"){
                extension_settings[extensionName][targetName] = {chatProperties: []}
            }
                
            // Check if chatProperties already has an entry for this chatId
            const existingProps = extension_settings[extensionName][targetName].chatProperties.find(prop => prop.chatId === chatId);
            
            setAttributeDisplay()
            if (existingProps) {
                // Update existing entry
                Object.assign(existingProps, {
                    isDefault:existingProps.isDefault,
                    triggerWords:currentData.triggerWords,
                    attribute:currentData.attribute,
                    maxValue:currentData.maxValue,
                    current:currentData.current
                });
            } else {
                // Add new entry
                extension_settings[extensionName][targetName].chatProperties.push({
                    chatId: chatId,
                    ...currentData
                });
            }
    
            saveSettingsDebounced(); // Save settings
        }

        newEntry.find('.saveValues').on('click', function() {
            saveData(false)
        });
    
        newEntry.find('.saveDefault').on('click', function() {
            saveData(true)
            $("#advanced_rpg_reset_character").show()
        });
    
        // Handle attribute input
        newEntry.find('.attribute_word').on('input', function() {
            const attribute = $(this).val().trim();
            const existingData = findDataFromAttribute(attribute)
            if (existingData == null){
                newEntry.find('.saveDefault').show()
                return
            }
            if (existingData.isDefault)
            {
                newEntry.find('.saveDefault').hide()
            }
            newEntry.find('.trigger_keywords').val(existingData.triggerWords)
            newEntry.find('.max_value').val(existingData.maxValue)
        });
    
        // Add input listener to only allow numbers in the max_value field
        newEntry.find('.max_value').on('input', function() {
            const value = $(this).val().replace(/\D/g, ''); // Allow only digits
            $(this).val(value); // Set the filtered value back to the input
        });
    
        $('#entriesContainer').append(newEntry); // Append the new entry
    });
    $("#advanced_rpg_reset_character_attributes").on('click',function(){
        const charName = getCharacterName();
        if (typeof(extension_settings[extensionName][charName]) != "undefined") {
            extension_settings[extensionName][charName] = {
                chatProperties: []
            };
            saveSettingsDebounced();
        }
    })
    $("#advanced_rpg_reset_character_defaults").on('click',function(){
        const charName = getCharacterName();
    
        // Attribute storage method
        if (typeof(extension_settings[extensionName][charName]) != "undefined") {
            var filtedChat = []
            for (let i = 0; i < extension_settings[extensionName][charName].chatProperties.length; i++) {
                const element = extension_settings[extensionName][charName].chatProperties[i];
                if (!element.isDefault)
                {filtedChat.push(element)}
            }
            extension_settings[extensionName][charName] = {
                chatProperties: filtedChat
            };
            saveSettingsDebounced();
        }
    })
})