const extensionName = "st-extension-rpg";
const extensionFolderPath = `scripts/extensions/third-party/${extensionName}`;

import { addDropdown } from "./advancedRPGHandler.js"
import {init} from "./attributeHandler.js"

jQuery(()=>{
    addDropdown()
    $('#advanced_rpg_add_element').on('click', function() {
        const template = $('#entryTemplate');
        const newEntry = template.clone().show(); // Clone and show the entry
        newEntry.find('.removeEntry').on('click', function() {
            newEntry.remove(); // Remove the entry when the remove button is clicked
        });

        // Add input listener to only allow numbers in the max_value field
        newEntry.find('.max_value').on('input', function() {
            // Get the current value and replace non-digit characters
            const value = $(this).val().replace(/\D/g, '');
            $(this).val(value); // Set the filtered value back to the input
        });

        $('#entriesContainer').append(newEntry); // Append the new entry
    });
})