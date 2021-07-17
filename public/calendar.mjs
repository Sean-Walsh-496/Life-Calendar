import { tailwinds } from "./util.mjs";

export const weeksInYear = 52;

export class WeekCell{
    constructor(){
        this.$el = this.get$el();
        this.used = false;
    }

    /**
     * 
     * @returns {HTMLElement}
     */
    get$el(){
        let item = document.createElement("li");
        item.className = tailwinds.weekCell;

        return item;
    }

    /**
     * @summary links to week page
     */
    onclick(){
        window.location.href = "./weekview.html"
    }
}

export class Calendar{
    constructor(weeks = 80 * weeksInYear){
        this.weeks = weeks;
        this.years = 80;
        this.$el = document.getElementById("year-list");
        this.matrix = this.getMatrix();
    }

    /**
     * @param {object} $el 
     * @returns {array}
     */
    getMatrix(){
        let years = [];

        for (let i = 0; i < this.years; i++){
            let year = [];
            for (let j = 0; j < weeksInYear; j++){
                year.push(new WeekCell());
            }
            years.push(year);
        }

        return years;

    }

    createYear(){
        let $year = document.createElement("ol");
        $year.className = tailwinds.weekCellList;

        return $year;
    }

    populate(){
        for (let i = 0; i < this.years; i++){
            let $year = this.createYear();
            for (let j = 0; j < weeksInYear; j++){
                $year.appendChild(this.matrix[i][j].$el);
            }
            if (i % 20 == 0 && i != 0){
                let divider = document.createElement("div");
                divider.className = tailwinds.divider;
                this.$el.append(divider);
            }
            this.$el.append($year);
        }
    }

    /**
     * @summary can either accept the element directly as one argument, or 
     * a pair of coordinates indicating the cell's position 
     */
    highlight(...args){
        switch(arguments.length){
            case 1:
                args[0].style.backgroundColor = "#F87171";
                break;
            case 2:
                this.matrix[args[0]][args[1]].$el.style.backgroundColor = "#F87171";
                break;
            default:
                console.error("An invalid number of arguments was passed");
        }
        
        
    }

    /**
     * @summary Highlights the number of used up weeks
     * @param {number} numUsed 
     */
    highlightUsed(numUsed){
        let weeks = this.$el.getElementsByTagName("li");
        let goTo = numUsed > this.weeks ? this.weeks : numUsed; //just in case...

        let localHighlight = this.highlight; //cannot reference method in anonymous function...
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