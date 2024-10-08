const extensionName = "st-extension-rpg";
const extensionFolderPath = `scripts/extensions/third-party/${extensionName}`;

export async function addDropdown(){
    const settingsHtml = await $.get(`${extensionFolderPath}/advancedTabRPG.html`);
    $("#character_popup").prepend(settingsHtml);
}