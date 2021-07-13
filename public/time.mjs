import {ItemPopup} from "./item-popup.mjs";
import {Item} from "./item.mjs";


export const dayTailwind = "flex flex-col w-1/7 h-full border border-gray-400 items-center";
const nameCardTailwind = "flex flex-col w-full h-1/8 border-b border-gray-400 text-center text-2xl font-bold select-none"
export const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
export const hourTailwind = "w-full h-full border-b border-gray-400";



export class Day{

    /**
     * @param {array} item_list
     * @param {string} dayName Monday through Sunday
     */
    constructor(dayName, week){
        this.dayName = dayName;
        this.itemList = this.makeItemList();
        this.$el = this.get$el();
        this.week = week;
    }

    /**
     * @param {number} res
     * @summary Creates a list where each item represents a unit of time.
     * @returns {array}
     */
    makeItemList(res = 1){
        let itemList = [];
        for (let i = 0; i < 24 * res; i++) itemList.push(null);
        return itemList
    }

    addHours($div){
        for (let i = 0; i < 24; i++){
            let $hour = document.createElement("div")
            $hour.className = hourTailwind;
            $div.appendChild($hour);
        }
    }

    /**
     * @summary Creates the day element
     * @returns {HTMLElement}
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

        $hourSpace.addEventListener("mousedown", e => {
            let newItem  = new Item("filler");
            this.insertItem(newItem);
            newItem.create(e.x, e.y);

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
     * @summary This method assumes that the item's HTML element has already been placed
     * into the day column.
     * @param {object} item 
     */
    insertItem(item){
        item.week = this.week;

        let list = this.itemList.map(el => el.get("top"));

        let after = 0; //insert the item after the index stored in this variable
        for (let i = 0; i < list.length; i++){
            if (list[i] < item.get("top")){
                after = i;
                break;
            }
        }


        this.itemList.splice(after + 1, 0, item);
        this.$el.appendChild(item.$el); //may or may not be important that this is ordered; sus.
        //this.arrangeItems();
    }

    
    removeItem(item){
        let targetIndex = this.itemList.findIndex(el => el === item);
        this.itemList.splice(targetIndex, 1);
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

    /**
     * 
     * @returns {array}
     */
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

