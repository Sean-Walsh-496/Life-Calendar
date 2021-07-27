import { Calendar } from "../classes/calendar.mjs";
import { TutorialScreen, slides } from "../classes/tutorial.mjs";

//variable declarations =================================================
const $calendar = new Calendar();
const $tutorial = new TutorialScreen(slides);


//event listeners
$tutorial.$el.addEventListener("finished", () => {
    $calendar.populate();
    $calendar.highlightUsed(numWeeks);
    document.getElementById("year-list").style.opacity = "1";
});



//main
async function main(){
    let user = await fetch("/user-profile").then(res => res.json());

    let DOB = new Date(user.DOB);

    let numWeeks = (new Date() - DOB) / (1000 * 60 * 60 * 24 * 7);
      
    
    if (user.newUser) {
        $tutorial.center();
    }

    else {
        $calendar.populate(); 
        $calendar.highlightUsed(numWeeks, false);
        document.getElementById("year-list").style.opacity = "1";
    }
    
}


main();
    



