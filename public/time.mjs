import {ItemPopup} from "./item-popup.mjs";


export const dayTailwind = "flex flex-col w-1/7 h-full border border-gray-400 items-center";
const nameCardTailwind = "flex flex-col w-full h-1/8 border-b border-gray-400 text-center text-2xl font-bold"
export const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
export const hourTailwind = "w-full h-full border-b border-gray-400";



export class Day{

    /**
     * @param {array} item_list
     * @param {string} dayName Monday through Sunday
     */
    constructor(dayName, week, itemList=[]){
        this.dayName = dayName;
        this.itemList = itemList;
        this.$el = this.get$el();
        this.week = week;
    }

    addHours($div){
        for (let i = 0; i < 24; i++){
            let $hour = document.createElement("div")
            $hour.className = hourTailwind;
            $div.appendChild($hour);
        }
    }

    /**
     * 
     * @returns {object}
     */
    get$el(){
        let $el = document.createElement("div");
        $el.className = dayTailwind;

        let $nameCard = document.createElement("div");
        $nameCard.className = nameCardTailwind;
        $nameCard.innerText = this.dayName;

        let $hourSpace = document.createElement("div");
        $hourSpace.className = "h-full w-full flex flex-col justify-center";
        
        this.addHours($hourSpace);
        $hourSpace.addEventListener("click", e => {
            //if (e.button == 2){
                const editWindow = new ItemPopup(document.getElementById("create-item"));
                editWindow.clickAppear(e);
            //}
        });

        $el.append($nameCard);
        $el.append($hourSpace);
        
        return $el;
    }

    /**
     * @summary Arranges the elements in the HTML due to their absolute positions
     */
    arrangeItems(){
        let bounds = this.$el.getBoundingClientRect();
        let left = bounds.left;
        let top = 34;

        this.itemList.forEach(el => {
            el.$el.style.left = `${left + 4}px`;
            el.$el.style.top = `${top}px`;
            top += el.$el.clientHeight + 3;
            
        });

    }

    /**
     * @param {object} item 
     */
    insertItem(item){
        item.week = this.week;
        this.itemList.push(item);
        this.$el.appendChild(item.$el);
        this.arrangeItems();
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
        
        let dayList = [];

        weekdays.forEach(el => {
            let d = new Day(el, this)
            dayList.push(d);
            
        });

        return dayList        
    }

    init$el(){
        this.days.forEach(el => {
            this.$el.appendChild(el.$el);
        });
    }
}

