import {Day, Week} from "./time.mjs";
import { ItemPopup } from "./item-popup.mjs";
import { SaveButton } from "./save.mjs";

//variable declarations =================================================
const $week = new Week();
const $container = document.getElementById("day-container");
export const $itemPop = new ItemPopup(document.getElementById("edit-popup"));
const $saveButton = new SaveButton($week);

// event listeners



//main ==================================================================

function main(){
    

}

main();