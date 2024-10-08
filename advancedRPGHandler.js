const extensionName = "st-extension-rpg";
const extensionFolderPath = `scripts/extensions/third-party/${extensionName}`;

export async function addDropdown(){
    const element = await $.get(`${extensionFolderPath}/advancedTabRPG.html`);
    const element2 = await $.get(`${extensionFolderPath}/rpgEntry.html`);
    $("#character_popup").children().eq(4).after(element)
    element.append(element2)
    print("Inserted advanced")
}