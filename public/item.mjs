import { tailwinds, functions } from "./util.mjs";

export class Item{
    /**
     * @param {string} name
     * @param {object} week
     * @param {object} day
     * @param {number} hour
     * @param {number} duration
     */
    constructor(name, week=null, day=null, hour=null, duration=null){
        this.name = name;
        this.hour = hour;
        this.duration = duration;
        this.week = week;
        this.day = day;

        this.wMargin = 3;
        this.$el = this.getElement();
        this.clicked = false;

    }

    /**
     * @returns {HTMLElement}
     */
    getElement(){
        //declare and initialize components of item element
        const hourHeight = document.getElementsByClassName(tailwinds.hour)[0].clientHeight;
        let $item = document.createElement("div");
        let $name = document.createElement("h2");
        let $topResizer = document.createElement("div");
        let $bottomResizer = document.createElement("div");
        let $bottomDiv = document.createElement("div");


        //styling and giving logic to the main div
        $item.className = tailwinds.item;
        this.initEventListeners($item);

        //Giving the div a name
        $name.innerText = this.name;
        $name.className = tailwinds.nameDiv;

        $topResizer.className = tailwinds.resizer
        $topResizer.setAttribute("name", "top-resizer");
        $bottomDiv.className = tailwinds.fillerDiv;
        $bottomResizer.className = tailwinds.resizer;
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
     * @summary internally updates the item's day and hour and internally updates
     * the week's matrix.
     */
    reassign(){
        this.day = functions.findDay(this.get("left"), 3, true, true);
        this.hour = functions.findHour(this.get("top"), this.get("height"), true, true);



        this.snap();

    }

    /**
     * @param {number} day
     * @param {number} hour
     * @summary snaps HTML element into given cell, or closest one if no arguments
     * are passed in.
     */
    snap(day = null, hour = null){

        this.$el.className = tailwinds.item;

        if (day) this.set("left", this.week.getPos(day, 1).left, true);

        //bandaid solution to getPos's imprecision
        this.set("left", functions.findDay(this.get("left")));


        if (hour){
            let newTop = this.week.getPos(1, hour).top;
            let newHeight = this.week.getPos(1, hour + this.duration) - newTop;
            this.set("top", newTop, true);
            this.set("height", newHeight, true);
        }

        else{
            this.set("top", functions.findHour(this.get("top"), this.get("height"), true));
            this.set('height', functions.findHour(this.get("top"), this.get("height"), false));
        }

        this.clicked = false;

        this.$el.children[1].innerText = `day: ${this.day}, hour: ${this.hour}`;
        console.log(this.week.days);
    }

    /**
     * @summary fits the dimensions of the nearest cell
     */
    fitSize(){
        let bounds = document.getElementsByClassName(tailwinds.day)[0].children[1].children[0].getBoundingClientRect()
        let hourWidth = bounds.width;
        let hourHeight = bounds.height;

        this.set("width", parseInt(hourWidth) - this.wMargin, true);
        this.set("height", hourHeight * 2, true);

    }

    /**
     * @param {object} $item 
     */
    initEventListeners($item){

        $item.addEventListener("mousedown", e => {
            this.clicked = e.target;
            this.className = tailwinds.movingItem;
        });

        document.addEventListener("mousemove", e => {
            if (this.clicked){

                switch(this.clicked.className){

                    case tailwinds.fillerDiv:
                        
                        $item.style.left = `${this.get("left") + e.movementX}px`;
                        $item.style.top = `${this.get("top") + e.movementY}px`;
                        $item.className = tailwinds.movingItem;
                        break;
                    
                    case tailwinds.resizer:

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
        document.addEventListener("mouseup", () => this.reassign());

        window.addEventListener("resize", () => this.snap(this.day, this.hour));

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