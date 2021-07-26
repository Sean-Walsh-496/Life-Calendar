import { tailwinds, functions } from ".././util.mjs";

export const weeksInYear = 52;
export class WeekCell{
    constructor(index=null){
        if (index !== null) [this.row, this.col] = index;
        this.$el = this.get$el();
        this.used = false;
        this.initEventListeners();
    }

    /**
     * @returns {HTMLElement}
     */
    get$el(){
        return functions.getTemplate("week");
    }

    /**
     * @summary links to week page
     */
    initEventListeners(){
        this.$el.addEventListener("click", async () => {
            let data = {col: this.col, row: this.row};
            await fetch("/week-index", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data),
            });
            window.location.href = "./weekview.html"
        });
        
        
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
                year.push(new WeekCell([i, j]));
            }
            years.push(year);
        }

        return years;

    }

    createYear(){
        return functions.getTemplate("year");
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
            this.$el.appendChild($year);
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
     * @param {boolean} isAnimated
     */
    highlightUsed(numUsed, isAnimated=true){
        let weeks = this.$el.getElementsByTagName("li");
        let goTo = numUsed > this.weeks ? this.weeks : numUsed; //just in case...

        let localHighlight = this.highlight; //cannot reference method in anonymous function...
        for (let i = 0; i < goTo; i++){
            if (isAnimated){
                setTimeout(function() {
                    localHighlight(weeks[i]);
                }, 3000 * (((i + 1)**2) / (goTo**2)) + 500);
            }
            else{
                localHighlight(weeks[i]);
            }

        }
    }
}
