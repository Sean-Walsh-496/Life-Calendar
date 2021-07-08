
const dayTailwind = "flex flex-col w-1/7 h-full border border-gray-400 items-center";
const nameCardTailwind = "flex flex-col w-full h-1/8 border-b border-gray-400 text-center text-2xl font-bold"


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
        
        $el.append($nameCard);
        
        return $el;
    }

    /**
     * @param {object} item 
     */
    insertItem(item){
        this.itemList.push(item);
        this.$el.appendChild(item.$el);
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
        const nameList = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
        let dayList = [];

        nameList.forEach(el => {
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

