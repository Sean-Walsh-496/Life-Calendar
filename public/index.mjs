import PopupWindow from "./popup.mjs";"./popup.mjs";
import {DateOfBirthWindow} from "./DOB.mjs";
import {Calendar} from "./calendar.mjs";

//variable declarations =================================================
let $popUp = new DateOfBirthWindow(document.getElementById("DOB-popup"));
let DOB, numWeeks;
const calendar = new Calendar();


//Event listener definitions ===========================================
$popUp.$el.addEventListener("input", e =>{
    if ($popUp.isAllFilled()){
        $popUp.changeVisibility();
        
        DOB = $popUp.getDate();
        numWeeks = Math.floor((new Date() - DOB) / (1000 * 60 * 60 * 24 * 7));

        calendar.highlightUsed(numWeeks);
    }

});


//main
$popUp.changeVisibility();
$popUp.center();
calendar.populate();

