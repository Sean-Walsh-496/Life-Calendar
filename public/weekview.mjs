import {Day, Week} from "./time.mjs";
import { SaveButton } from "./save.mjs";

//variable declarations =================================================
const $week = new Week();
const $container = document.getElementById("day-container");

const $saveButton = new SaveButton($week);

//loading in content
let response = await fetch("/view-week");
response = response.json();

if (! response.isBlank){
    
}


//main ==================================================================

function main(){
    

}

main();