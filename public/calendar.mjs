const weeksInYear = 52;
const weekTailwind = "h-full w-2 border border-black ml-0.5 mr-0.5";
const weekListTailwind = "m-0.5 flex max-w-6xl w-full h-3 justify-between items-center";
const dividerTailwind = "max-w-6xl w-full h-1";

export class Calendar{
    constructor(weeks = 80 * weeksInYear){
        this.weeks = weeks;
        this.$el = document.getElementById("year-list");
    }

    createWeek(){
        let item = document.createElement("li");
        item.className = weekTailwind;

        return item;
    }

    createYear(){
        let $year = document.createElement("ol");
        $year.className = weekListTailwind

        return $year;
    }

    populate(){
        for (let i = 0; i < 80; i++){
            let $year = this.createYear();
            for (let j = 0; j < 52; j++){
                $year.appendChild(this.createWeek());
            }
            if (i % 20 == 0){
                let divider = document.createElement("div");
                divider.className = dividerTailwind;
                divider.style.backgroundColor = "#4B5563";
                this.$el.append(divider);
            }
            this.$el.append($year);
        }
    }

    /**
     * @summary Highlights the number of used up weeks
     * @param {number} numUsed 
     */
    highlightUsed(numUsed){
        let weeks = this.$el.getElementsByTagName("li");
        let goTo = numUsed > this.weeks ? this.weeks : numUsed; //just in case...

        for (let i = 0; i < goTo; i++){
            setTimeout(function() {
                weeks[i].style.backgroundColor = "#F87171";
            }, 3000 * (((i + 1)**2) / (goTo**2)) + 500);
            
        }
    }
}