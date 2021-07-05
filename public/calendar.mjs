const weeksInYear = 52;
const weekTailwind = "h-full w-2 border border-black ml-0.5 mr-0.5"
const weekListTailwind = "m-0.5 flex w-9/12 h-3 justify-between items-center"


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
            this.$el.append($year);
        }
    }

    /**
     * @summary Highlights the number of used up weeks
     * @param {number} numUsed 
     */
    highlightUsed(numUsed){
        for (let i = 0; i < numUsed; i++){

        }
    }
}