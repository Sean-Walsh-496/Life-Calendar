
function parseDateString(dateString){

}

class Day{
    /**
     * @param {array} item_list
     */
    constructor(itemList, date){
        this.itemList = itemList;
        [this.day, this.month, this.year] = parseDateString(date);
    }

    /**
     * @param {object} item 
     */
    insertItem(item){

    }

}

class Week{
    /**
     * @param {array} days
     */
    constructor(days){
        this.days = days
    }
}

