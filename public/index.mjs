import PopupWindow from "./popup.mjs";"./popup.mjs";
import {DateOfBirthWindow} from "./DOB.mjs";

let $popUp = new DateOfBirthWindow(document.getElementById("DOB-popup"));
console.log($popUp);
$popUp.changeVisibility();
$popUp.center();
