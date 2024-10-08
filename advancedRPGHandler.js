const extensionName = "st-extension-rpg";
const extensionFolderPath = `scripts/extensions/third-party/${extensionName}`;

export async function addDropdown(){
    const element = await $.get(`${extensionFolderPath}/advancedTabRPG.html`);
    $("#character_popup").children().eq(3).after(element)
    print("Inserted advanced")
}