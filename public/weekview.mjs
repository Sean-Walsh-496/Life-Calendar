import {Day, Week} from "./time.mjs";
import {Item} from "./item.mjs";

//variable declarations =================================================
const $week = new Week();
//main ==================================================================

function main(){
    $week.days[0].insertItem(new Item('1', '2', 3));
    console.log($week.days[0]);

}

main();