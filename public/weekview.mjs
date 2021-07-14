import {Day, Week} from "./time.mjs";
import {Item} from "./item.mjs";
import { ItemPopup } from "./item-popup.mjs";

//variable declarations =================================================
const $week = new Week();
const $container = document.getElementById("day-container");
//const $itemPop = new ItemPopup(document.getElementById("create-item"));

// event listeners



//main ==================================================================

function main(){
    console.log($week.getPos(1, 1));

}

main();