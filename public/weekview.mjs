import {Day, Week} from "./time.mjs";
import {Item} from "./item.mjs";
import { ItemPopup } from "./item-popup.mjs";

//variable declarations =================================================
const $week = new Week();
//const $itemPop = new ItemPopup(document.getElementById("create-item"));
//main ==================================================================

function main(){
    $week.days[0].insertItem(new Item('Study', '2', 3));


}

main();