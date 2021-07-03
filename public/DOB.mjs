import popupWindow from "./popup.mjs";


export class DateOfBirthWindow extends popupWindow {
    constructor($el){
        super($el);
        [this.$month, this.$day, this.$year] = this.initInputs($el);
    }

    /**
     * @param {object} $el
     * @returns {array} 
     */
    initInputs($el){
        let $inputDiv = $el.querySelector("div[name='input-div']");
        return $inputDiv.querySelectorAll("input");
    }

    /**
     * @summary determines if all three fields have been filled out
     * @returns {boolean}
     */
    isAllFilled(){

    }
}