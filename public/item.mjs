const hourTailwind = "w-full h-full border-b border-gray-400", dayTailwind = "flex flex-col w-1/7 h-full border border-gray-400 items-center";
const itemTailwind = "absolute flex flex-col bg-purple-400 rounded border border-gray-400";
const movingItemTailwind = "absolute flex flex-col bg-purple-400 rounded border border-gray-400 shadow-md transform scale-110 z-50";
const resizerTailwind = "w-full h-2 transform duration-300 hover:bg-purple-700";
const nameTailwind = "w-full select-none text-white";
const fillerTailwind = "h-full w-full";

export class Item{
    /**
     * @param {string} name
     * @param {object} time
     * @param {object} duration
     */
    constructor(name, time=null, duration=null){
        this.name = name;
        this.hour = time;
        this.duration = duration;
        this.week = null;
        this.day = null;

        this.wMargin = 3;
        this.$el = this.getElement();
        this.clicked = false;

    }

    /**
     * @returns {HTMLElement}
     */
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
     * @param {string} att 
     * @param {string | number} value 
     * @param {boolean} stringify
     */
    set(att, value, stringify = false){
        if (stringify){
            this.$el.style[att] = `${value}px`;
        }

        else{
            this.$el.style[att] = value;
        }
        
    }

    /**
     * @summary snaps HTML element into nearest cell
     */
    snap(){
        this.$el.className = itemTailwind;
        this.set("left", this.findDay());
        this.set("top", this.findHour(true));
        this.set('height', this.findHour(false));
        this.clicked = false;
    }

    /**
     * @summary fits the dimensions of the nearest cell
     */
    fitSize(){
        let bounds = document.getElementsByClassName(dayTailwind)[0].children[1].children[0].getBoundingClientRect()
        let hourWidth = bounds.width;
        let hourHeight = bounds.height;
        

        console.log(hourWidth);

        this.set("width", parseInt(hourWidth) - this.wMargin, true);
        this.set("height", hourHeight * 2, true);

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

        //$item.addEventListener("mouseleave", drop);
        document.addEventListener("mouseup", () => this.snap());

        window.addEventListener("resize", () => this.snap());

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

    /**
     * @summary returns nearest day cell's y-position
     * @returns {string}
     */
    findDay(){
        let itemX = this.get("left");
        let positions = [];

        this.week.days.forEach(el => {
            positions.push(el.$el.getBoundingClientRect().left);
        });
        
        return `${this.findClosest(itemX, positions) + this.wMargin}px`;
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

    /**
     * @summary adds a smoothing transition
     */
    smooth(){
        this.$el.style.transitionProperty = "height, width";
        this.$el.style.transitionDuration = "1s";
    }

    /**
     * @summary removes the smooth transitions
     */
    removeSmooth(){
        this.$el.style.transitionProperty = "";
        this.$el.style.transitionDuration = "";
    }

    /**
     * @summary snaps the item into place and creates it, giving a smooth
     * animation.
     */
    create(x, y){
        this.smooth();
        this.set("visibility", "hidden");
        this.set("left", x, true);
        this.set("top", y, true);

        this.set("width", 10, true);
        this.set("height", 30, true);

        this.set("visibility", "visible");
        this.snap();
        this.fitSize();

        setTimeout( () => this.removeSmooth(), 1000);
        

    }

}