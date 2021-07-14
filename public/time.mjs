import { Item } from "./item.mjs";
import { tailwinds, functions, weekdays } from "./util.mjs";

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
            $hour.className = tailwinds.hour;
            $div.appendChild($hour);
        }
    }

    /**
     * @summary returns boundingClientRect of hourspace.
     * @returns {ClientRect}
     */
    getHourSpaceDims(){
        return document.getElementById("hour-space");
    }

    /**
     * @summary returns the boundingClientRect of the hour cells
     * @returns {ClientRect}
     */
    getHourDims(){
        let hourSpace = this.getElementById("hour-space");
        let hour = hourSpace.children[0];
        return hour.getBoundingClientRect();
    }

    /**
     * @param {MouseEvent} e
     * @returns {HTMLElement} 
     */
    clickIn(e){
        let hourIndex = functions.findHour(e.y, this.$el.children[1].getBoundingClientRect().height, true, true);
        console.log(hourIndex);
        let newItem = new Item("filler", this.week, this, hourIndex, 2);
        this.insertItem(newItem, hourIndex); //breaks code
        newItem.create(e.x, e.y);
    }

    /**
     * @summary Creates the day element
     * @returns {HTMLElement}
     */
    get$el(){
        let $el = document.createElement("div");
        $el.className = tailwinds.day;

        let $nameCard = document.createElement("div");
        $nameCard.className = tailwinds.weekNameDiv;
        $nameCard.innerText = this.dayName;

        let $hourSpace = document.createElement("div");
        $hourSpace.className = "h-full w-full flex flex-col justify-center";
        $hourSpace.id = "hour-space";
        
        this.addHours($hourSpace);

        $hourSpace.addEventListener("mousedown", e => this.clickIn(e));

        $el.append($nameCard);
        $el.append($hourSpace);
        
        return $el;
    }

    /**
     * 
     * @param {number} index 
     * @param {number} size
     * @returns {boolean} 
     */
    isEmptyBlock(index, size){
        for (let i = index; i < index + size; i++){
            if (this.itemList[i] != null){
                return false;
            }
        }
        return true;
    }

    /**
     * 
     * @param {number} index 
     * @param {number} size
     * @returns {void} 
     */
    shiftDown(index, size){
        let stack = [];
        for (let i = 0; i < size; i++) stack.push(null);

        while (stack.length > 0){
            if (this.itemList[index] !== null){
                stack.push(this.itemList[index]);
            }
            this.itemList[index] = stack.shift();
            index++;
        }

    }

    /**
     * @summary This method will assume that it is only pushing other elements down,
     * in other words, that it is either starting at an empty index or at the top
     * of another block of time.
     * @param {object} item
     * @param {number} index
     * @returns {void}
     */
    insertItem(item, index){
        this.shiftDown(index, item.duration); //breaks code
        for(let i = index; i < index + item.duration; i++) this.itemList[i] = item;

        item.week = this.week;
        item.day = this;
        this.$el.appendChild(item.$el);
    }
    
    /**
     * @param {object} item 
     */
    removeItem(item){
        this.itemList.forEach(el => {
            if (el === item) el = null;
        });
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

    /**
     * @summary Gets the dimensions of the hourspace for the entire week
     * @returns {object}
     */
    getWeekBounds(){
        let $monHours = this.days[0].$el.children[1];
        let bounds = $monHours.getBoundingClientRect();
        return {
            top: bounds.top,
            height: bounds.height,
            left: bounds.left,
            width: bounds.width * 7
        };
        
    }

    /**
     * @param {number} day index starts at zero
     * @param {number} hour index starts at zero
     * @returns {object} top and left values as numbers, NOT STRINGS!
     */
    getPos(day, hour){
        const {left, width, height, top} = this.getWeekBounds();
        return {
            left: left + (width * (day / 7)),
            top: top + (height * (hour / 24))
            };
    }
}

