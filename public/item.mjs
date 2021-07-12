const hourTailwind = "w-full h-full border-b border-gray-400", dayTailwind = "flex flex-col w-1/7 h-full border border-gray-400 items-center";
const itemTailwind = "absolute flex flex-col bg-white rounded border border-gray-400";
const movingItemTailwind = "absolute flex flex-col bg-white rounded border border-gray-400 shadow-md transform scale-110 z-50";
const resizerTailwind = "w-full h-2 transform duration-300 hover:bg-blue-300";
const nameTailwind = "w-full select-none";
const fillerTailwind = "h-full w-full";

export class Item{
    /**
     * 
     * @param {string} name
     * @param {object} time
     * @param {object} duration
     */
    constructor(name, time, duration, width = 135){
        this.name = name;
        this.time = time;
        this.duration = duration;
        this.width = `${width}px`;
        
        this.week = null;
        this.$el = this.getElement();
        this.clicked = false;
    }

    getElement(){
        //declare and initialize components of item element
        const hourHeight = document.getElementsByClassName(hourTailwind)[0].clientHeight;
        let $item = document.createElement("div");
        let $name = document.createElement("h2");
        let $topResizer = document.createElement("div");
        let $bottomResizer = document.createElement("div");
        let $bottomDiv = document.createElement("div");


        //styling and giving logic to the main div
        $item.className = itemTailwind;
        $item.style.height = `${hourHeight * this.duration}px`;
        $item.style.width = this.width;
        this.initEventListeners($item);

        //Giving the div a name
        $name.innerText = this.name;
        $name.className = nameTailwind;

        $topResizer.className = resizerTailwind
        $topResizer.setAttribute("name", "top-resizer");
        $bottomDiv.className = fillerTailwind;
        $bottomResizer.className = resizerTailwind;
        $bottomResizer.setAttribute("name", "bottom-resizer");

        $item.appendChild($topResizer);
        $item.appendChild($name);
        $item.appendChild($bottomDiv)
        $item.appendChild($bottomResizer);

        
        return $item;
    }

    /**
     * @summary returns the item element's given attribute
     * @param {string} att 
     * @returns {number}
     */
    get(att){
        return parseInt(this.$el.style[att].slice(0, -2));
    }

    /**
     * @param {object} $item 
     */
    initEventListeners($item){

        $item.addEventListener("mousedown", e => {
            this.clicked = e.target;
            this.className = movingItemTailwind;
        });

        document.addEventListener("mousemove", e => {
            if (this.clicked){

                switch(this.clicked.className){

                    case fillerTailwind:
                        
                        $item.style.left = `${this.get("left") + e.movementX}px`;
                        $item.style.top = `${this.get("top") + e.movementY}px`;
                        $item.className = movingItemTailwind;
                        break;
                    
                    case resizerTailwind:

                        if (this.clicked.getAttribute("name") == "top-resizer"){
                            $item.style.height = `${this.get("height") - e.movementY}px`;
                            $item.style.top = `${this.get("top") + e.movementY}px`;
                        }

                        else if (this.clicked.getAttribute("name") == "bottom-resizer"){
                            $item.style.height = `${this.get("height") + e.movementY}px`;
                        }

                        break;
                }
            }
        });

        let drop = () => {
            $item.className = itemTailwind;
            this.$el.style.left = this.findDay();
            this.$el.style.top = this.findHour(true);
            this.$el.style.height = this.findHour(false);
            this.clicked = false;
        }

        //$item.addEventListener("mouseleave", drop);
        document.addEventListener("mouseup", drop);
    }

    /**
     * @param {number} cur 
     * @param {array} available 
     * @returns {number}
     */
    findClosest(cur, available){
        let closestDist = Number.MAX_VALUE;
        let closestEl;

        available.forEach(el => {
            if (Math.abs(cur - el) < closestDist){
                closestDist = Math.abs(cur - el);
                closestEl = el;
            }
        });

        return closestEl;
    }

    findDay(){
        let itemX = parseInt(this.$el.style.left.slice(0, -2));
        let positions = [];

        this.week.days.forEach(el => {
            positions.push(el.$el.getBoundingClientRect().left);
        });
        
        return `${this.findClosest(itemX, positions) + 4}px`;
    }

    /**
     * @summary snaps either the bottom or top to the nearest hour
     * @param {boolean} isTop 
     * @returns {string}
     */
    findHour(isTop = true){
        let itemY = isTop ? this.get("top") : this.get("top") + this.get("height");
        let hours = Array.from(document.getElementsByClassName(dayTailwind)[0].children[1].children);
        
        let positions = [];

        hours.forEach(el => {
            let bounds = el.getBoundingClientRect();
            let pos = isTop ? bounds.top : bounds.top + bounds.height;
            positions.push(pos);
        });
        
        let closest = this.findClosest(itemY, positions);
        return isTop ? `${closest}px` : `${closest - this.get("top")}px`;
    }

    

}