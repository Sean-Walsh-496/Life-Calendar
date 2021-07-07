export const weeksInYear = 52;
export const weekTailwind = "h-full w-2 border border-black ml-0.5 mr-0.5";
const weekListTailwind = "m-0.5 flex max-w-6xl w-full h-3 justify-between items-center";
export const dividerTailwind = "max-w-6xl w-full h-1";

export class Calendar{
    constructor(weeks = 80 * weeksInYear){
        this.weeks = weeks;
        this.$el = document.getElementById("year-list");
        this.matrix = undefined;
    }

    /**
     * @param {object} $el 
     * @returns {array}
     */
    getMatrix($el){
        let weekList = [...$el.children];
        for (let i = 0; i < weekList.length; i++){
            weekList[i] = [...weekList[i].children];
        }

        let i = 0; 
        while (i < weekList.length){
            if (weekList[i].length == 0){
                weekList.splice(i, 1);
                continue;
            }

            i++;
        }

        return weekList;
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

        this.matrix = this.getMatrix(this.$el);
    }

    /**
     * @param {object} $el 
     */
    highlight($el){
        $el.style.backgroundColor = "#F87171";
    }

    /**
     * @summary Highlights the number of used up weeks
     * @param {number} numUsed 
     */
    highlightUsed(numUsed){
        let weeks = this.$el.getElementsByTagName("li");
        let goTo = numUsed > this.weeks ? this.weeks : numUsed; //just in case...

        let localHighlight = this.highlight; //cannot reference method in anonymous function.
        for (let i = 0; i < goTo; i++){
            setTimeout(function() {
                localHighlight(weeks[i]);
            }, 3000 * (((i + 1)**2) / (goTo**2)) + 500);
            
        }
    }

    /**
     * 
     * @param {number} row 
     * @param {number} col 
     * @returns {boolean}
     */
    areValidCoords(row, col){
        return (row > -1 && row < this.weeks && col > -1 && col < weeksInYear);
    }
}