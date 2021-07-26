import { Calendar } from "../classes/calendar.mjs";


//variable declarations =================================================
const $calendar = new Calendar();


//main
document.addEventListener("DOMContentLoaded", async function(e){
    $calendar.populate();    
    let response = await fetch("/age")
                    .then(res => res.text())
                    .then(res => new Date(res));

    let numWeeks = (new Date() - response) / (1000 * 60 * 60 * 24 * 7);

    $calendar.highlightUsed(numWeeks);

});


