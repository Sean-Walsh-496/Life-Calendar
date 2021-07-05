import popupWindow from "./popup.mjs";


export class DateOfBirthWindow extends popupWindow {
    constructor($el){
        super($el);
        [this.$month, this.$day, this.$year] = this.#initInputs($el);
    }

    /**
     * @param {object} $el
     * @returns {array} 
     */
    #initInputs($el){
        let $inputDiv = $el.querySelector("div[name='input-div']");
        return $inputDiv.querySelectorAll("input");
    }

    /**
     * @param {object} $el 
     * @param {string} type
     * @returns {boolean} 
     */
    isValidDate($el, type){

        type = type.toLocaleLowerCase();
        value = parseInt($el.value);

        if (type == "day" || type == 'd'){
            return value > 0 && value < 32; // sus
        }
        else if (type == "month" || type == 'm'){
            return value > 0 && value < 13;
        }
        else if (type == "year" || type == 'y'){
            let curYear = parseInt(new Date().getFullYear());
            return value > curYear - 80 && value < curYear;
        }
        else {
            console.error(`Invalid date type (${type}) passed in!`)
            return false;
        }
    }

    /**
     * @summary determines if all three fields have been filled out
     * @returns {boolean}
     */
    isAllFilled(){
        let dateList = [this.$day, this.$month, this.$year];
        
        dateList.forEach(el => {
            if (! this.isValidDate(el)) return false;
        });
        return true;
    }

    /**
     * @summary returns a date object that is initialized using the data filled in the window.
     * @returns {object}
     */
    getDate(){
        let {$day, $month, $year} = this;

        if (this.isAllFilled()){
            return new Date($year.value, $month.value - 1, $day.value);
        }
        else{
            console.error(`Window is not fully or is improperly filled out! Y:${$year.value} M:${$month.value} D:${$day.value}`);
            return null;
        }
    }
}
