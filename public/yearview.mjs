import PopupWindow from "./popup.mjs";"./popup.mjs";
import {DateOfBirthWindow} from "./DOB.mjs";
import { tailwinds } from "./util.mjs";
import {Calendar, weeksInYear} from "./calendar.mjs";

//variable declarations =================================================
let $popUp = new DateOfBirthWindow(document.getElementById("DOB-popup"));
let DOB, numWeeks;
const $calendar = new Calendar();

//Functions ============================================================
function getSizes(){
    const bounds = $calendar.$el.getBoundingClientRect();
    const dividerBounds = document.getElementsByClassName(tailwinds.divider)[0].getBoundingClientRect();
    const weekBounds = document.getElementsByClassName(tailwinds.weekCell)[0].getBoundingClientRect();

    return {
        calendar : {
            pos : [bounds.x, bounds.y],
            width : bounds.right - bounds.x,
            height : bounds.bottom - bounds.y,
        },
        
        divider : {
            width : dividerBounds.right - dividerBounds.x,
            height : dividerBounds.bottom - dividerBounds.y
        },

        week : {
            width : weekBounds.right - weekBounds.x,
            height : weekBounds.bottom - weekBounds.y
        }


    }
}

//Event listener definitions ===========================================
$popUp.$el.addEventListener("input", e =>{
    if ($popUp.isAllFilled()){
        $popUp.changeVisibility();
        
        DOB = $popUp.getDate();
        numWeeks = Math.floor((new Date() - DOB) / (1000 * 60 * 60 * 24 * 7));

        $calendar.highlightUsed(numWeeks);
    }

});

//main
document.addEventListener("DOMContentLoaded", function(e){
    //$popUp.changeVisibility();
    $popUp.center();
    $calendar.populate();    
});


