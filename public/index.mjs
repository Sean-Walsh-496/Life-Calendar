import PopupWindow from "./popup.mjs";"./popup.mjs";
import {DateOfBirthWindow} from "./DOB.mjs";

//variable declarations =================================================
let $popUp = new DateOfBirthWindow(document.getElementById("DOB-popup"));
let DOB;
$popUp.$el.addEventListener("input", e =>{
    if ($popUp.isAllFilled()){
        DOB = $popUp.getDate();
        $popUp.changeVisibility();
    }

});


$popUp.changeVisibility();
$popUp.center();
