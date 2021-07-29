import { Item } from "./item.mjs";
import { tailwinds, functions, weekdays } from ".././util.mjs";

export class Day{

    /**
     * @param {string} dayName SUN through SAT
     * @param {Week} week
     * @param {number} dayNum day of the month
     * @param {boolean} build
     */
    constructor(dayName, week, dayNum=0, build=true){
        this.dayName = dayName;
        this.dayNum = dayNum
        this.itemList = this.makeItemList();

        if (build) this.$el = this.get$el();

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
            let $hour = functions.getTemplate("hour");
            
            if(i == 23){
                $hour.classList.remove("border-b");
            }

            $div.append($hour);
        }
    }

    /**
     * @summary returns boundingClientRect of hourspace.
     * @returns {ClientRect}
     */
    getHourSpaceDims(){
        return this.$el.querySelector("ol[name='hour-space']").getBoundingClientRect();
    }

    /**
     * @summary returns the boundingClientRect of the hour cells
     * @returns {ClientRect}
     */
    getHourDims(){
        let hourSpace = this.$el.querySelector("ol[name='hour-space']");
        let hour = hourSpace.children[0];
        return hour.getBoundingClientRect();
    }

    /**
     * @summary Returns this day's index in the week's itemList
     * @returns {number}
     */
    getIndex(){
        const {days} = this.week;
        for (let i = 0; i < days.length; i++){
            if (days[i] == this){
                return i;
            }
        }
        return null;

    }

    /**
     * @param {MouseEvent} e
     * @returns {HTMLElement} 
     */
    clickIn(e){
        let hourIndex = functions.findHour(e.y, this.$el.children[1].getBoundingClientRect().height, true, true);

        let hourPos = this.$el.children[1].children[hourIndex].getBoundingClientRect();

        let newItem = new Item("filler", this.week, this.getIndex(), hourIndex, 2);
        newItem.create(hourPos.left, hourPos.top);
    }

    /**
     * @summary Creates the day element
     * @returns {HTMLElement}
     */
    get$el(){
        const $el = functions.getTemplate("day");
        let $name =  $el.querySelector("div[name='day-name']"), $hourSpace = $el.querySelector("ol[name='hour-space']");
        let $number = $el.querySelector("div[name='day-number']");

        $name.innerText = this.dayName;
        $number.innerText = this.dayNum;
    
        this.addHours($hourSpace);

        $hourSpace.addEventListener("mousedown", e => this.clickIn(e));
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

    findMiddle(item){
        return Math.round(item.duration / 2) + item.hour;
    }

    /**
     * @param {number} index 
     * @param {number} n the amount to shift
     * @param {boolean} down 
     */
    itemShift(index, n, down){
        const next = down ? 1 : -1;
        let stack = [];
        for (let i = 0; i < n; i++) stack.push(null);

        while (stack.length > 0){
            if (this.itemList[index] !== null){
                stack.push(this.itemList[index]);
            }
            
            let current = stack.shift();
            this.itemList[index] = current;
            let condition;

            if (down) condition = current !== null && current !== this.itemList[index - next];
            else condition = current !== null && stack.find(el => el === current) === undefined;

            if (condition){
                current.hour = index;
                current.smooth(() =>{
                    let side = down ? "top" : "bottom";
                    current.snap(current.day, current.hour);
                }, "top, left", 750);
                
            }

            index += next
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
        
        let middle = this.findMiddle(item);
        let upStart = index;
        for (let i = index; i < middle; i++){
            let cur = this.itemList[i];
            if (cur !== null){
                if (this.findMiddle(cur) > middle){
                    break
                }
                else{
                    upStart = cur.hour + cur.duration - 1;
                }
            }            
        }
        this.itemShift(upStart, upStart - index + 1, false);


        this.itemShift(index, item.duration, true);
        for(let i = index; i < index + item.duration; i++) this.itemList[i] = item;

        item.week = this.week;
        item.day = this.getIndex();
        this.$el.appendChild(item.$el);
    }
    
    /**
     * @param {object} item 
     */
    removeItem(item){
        this.itemList.forEach((el, i) => {
            if (el === item) this.itemList[i] = null;
        });
    }

}

export class Week{
    /**
     * @param {array} days
     */
    constructor(build=true){
        this.init(build);
    }


    /**
     * @summary calculates the number of days to the right of the start of the week a day is
     * @param {Date} date 
     * @returns {number}
     */
    nearestSunday(date){
        const fullDay = 1000*60*60*24;
        let shift = 0;
        while (new Date(date - (shift * fullDay)).getDay() !== 0){
            shift++;
            if (shift > 100) return;
        }
        return -shift;
    }

    async init(build=true){
    
        let [user, pos, saved] = await Promise.all([fetch("/user-profile").then(res => res.json()),
                                                    fetch("/week-index").then(res => res.json()),
                                                    fetch("/view-week").then(res => res.json())]);


        let DOB = new Date(user.DOB).getTime();
        let offset = this.nearestSunday(DOB);
        this.sundayDay = new Date(DOB + ((7 * pos.col + (52 * 7 * pos.row) + offset) * 1000 * 60 * 60 * 24)).getTime();
        
        this.days = this.createDays(build);

        if (build) this.$el = document.getElementById("day-container");
            
        if (build) this.init$el();
        if (!saved.hasOwnProperty("isBlank")) await this.importDays(saved);

    }

    async importDays(saved){
        for (let day = 0; day < 7; day++){
            for (let hour = 0; hour < 24; hour++){

                if (saved[day].itemList[hour] !== null){
                    let cur = saved[day].itemList[hour];
                    let item = new Item(cur.name, this, this.days[day], hour, cur.duration);
                    functions.changeItemColor(item.$el, functions.findColor(cur.color));
                    this.days[day].insertItem(item, hour);
                    item.snap(day, hour);
                    item.created = true;
                    hour += item.duration - 1;
                }
                
            }
        }
    }

    /**
     * 
     * @returns {array}
     */
    createDays(build=true){

        let dayList = [];

        weekdays.forEach((el, i) => {
            let d = new Day(el, this, new Date(this.sundayDay + (i * 1000*3600*24 )).getDate(), build);

            if (d.hasOwnProperty("$el")){
                if (i == 0){
                    d.$el.classList += " border-l";
                }
                if (i == 0 || i == 6){
                    d.$el.classList += " bg-gray-200";
                }
            }

            dayList.push(d);
            
        });

        return dayList        
    }

    init$el(){
        console.log(this.days);
        this.days.forEach(el => {
            this.$el.appendChild(el.$el);
        });
    }

    /**
     * @summary Gets the dimensions of the hourspace for the entire week
     * @returns {object}
     */
    getWeekBounds(){
        let $monHour = this.days[0].$el.children[1];
        let bounds = $monHour.getBoundingClientRect();
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

    getSendable(){
        let data = this.days;
        let newList = [];
        data.forEach((el, i) => {
            newList.push(functions.copyObject(el, ["week", "$el", "itemList"]));
            newList[i].itemList = [];
            
            data[i].itemList.forEach((item) => {

                if (item !== null){
                    newList[i].itemList.push(item.getSendable());
                }
                else{
                    newList[i].itemList.push(null);
                }
            });
        });
        
        return JSON.stringify(newList);
    }
}

