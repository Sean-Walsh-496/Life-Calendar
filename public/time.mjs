
const dayTailwind = "flex flex-col w-1/7 h-full border border-gray-400";


export class Day{

    /**
     * @param {array} item_list
     * @param {string} dayName Monday through Sunday
     */
    constructor(dayName, itemList=[]){
        this.dayName = dayName;
        this.itemList = itemList;
        this.$el = this.get$el();
    }

    /**
     * 
     * @returns {object}
     */
    get$el(){
        let $el = document.createElement("div");
        $el.className = dayTailwind;
        return $el;
    }

    /**
     * @param {object} item 
     */
    insertItem(item){
        this.itemList.push(item);
        let $itemEl = item.getElement();
        this.$el.appendChild($itemEl);
    }

}

export class Week{
    /**
     * @param {array} days
     */
    constructor(){
        this.$el = document.getElementById("day-container");
        this.days = this.createDays();
        this.init$el();
    }

    createDays(){
        const nameList = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
        let dayList = [];

        nameList.forEach(el => {
            let d = new Day(el)
            dayList.push(d);
            
        });

        return dayList        
    }

    init$el(){
        this.days.forEach(el => {
            this.$el.appendChild(el.get$el());
        });
    }
}

