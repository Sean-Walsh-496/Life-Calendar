
const dayTailwind = "flex flex-col w-1/7 h-full border border-gray-400 items-center";
const nameCardTailwind = "flex flex-col w-full h-1/8 border-b border-gray-400 text-center text-2xl font-bold"
const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

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

        let $nameCard = document.createElement("div");
        $nameCard.className = nameCardTailwind;
        $nameCard.innerText = this.dayName;

        let $hourSpace = document.createElement("div");
        $hourSpace.className = "h-full w-full flex flex-col justify-center";
        
        for (let i = 0; i < 24; i++){
            let $hour = document.createElement("div")
            $hour.className = "w-full h-full border-b border-gray-400";
            $hourSpace.appendChild($hour);
        }

        $el.append($nameCard);
        $el.append($hourSpace);
        
        return $el;
    }

    #getLeft(){
        return ((weekdays.indexOf(this.dayName)) / 7) * window.innerWidth;
    }

    /**
     * @summary Arranges the elements in the HTML due to their absolute positions
     */
    arrangeItems(){
        let left = this.#getLeft();
        let top = 35;

        this.itemList.forEach(el => {
            el.$el.style.left = `${left}px`;
            el.$el.style.top = `${top}px`;
            top += el.$el.clientHeight + 2 * parseInt(getComputedStyle(el.$el).margin.slice(0, -2));
            
        });

    }

    /**
     * @param {object} item 
     */
    insertItem(item){
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
            let d = new Day(el)
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

