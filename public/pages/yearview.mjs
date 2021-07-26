import { Calendar } from "../classes/calendar.mjs";


//variable declarations =================================================
const $calendar = new Calendar();


//main
document.addEventListener("DOMContentLoaded", async function(e){
    $calendar.populate();    
    let user = await fetch("/user-profile").then(res => res.json());

    let DOB = new Date(user.DOB);

    let numWeeks = (new Date() - DOB) / (1000 * 60 * 60 * 24 * 7);

    if (user.newUser) $calendar.highlightUsed(numWeeks);

    else $calendar.highlightUsed(numWeeks, false);
    

});


