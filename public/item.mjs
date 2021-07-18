import { tailwinds, functions } from "./util.mjs";
import { ItemPopup } from "./item-popup.mjs";

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
        this.$input = this.$el.querySelector("input[name='name-field']");
        this.clicked = false;

        this.created = false;

    }

    
    /**
     * @returns {HTMLElement}
     */
    getElement(){
        let $item = functions.getTemplate("item");

        //styling and giving logic to the main div
        this.initEventListeners($item);

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

        this.week.days[this.day].removeItem(this);

        this.day = functions.findDay(this.get("left"), 3, true, true);
        this.hour = functions.findHour(this.get("top"), this.get("height"), true, true);
        let bottom = functions.findHour(this.get("top"), this.get("height"), false, true) + 1; //sus
        this.duration = this.created ? bottom - this.hour : this.duration;

        this.week.days[this.day].insertItem(this, this.hour);

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

        if (day !== null) this.set("left", this.week.getPos(day, 1).left, true);


        //bandaid solution to getPos's imprecision
        this.set("left", functions.findDay(this.get("left")));


        if (hour !== null){
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
    }

    /**
     * @param {object} $item 
     */
    initEventListeners($item){

        $item.addEventListener("mousedown", e => {
            if (e.button == 0){
                if (e.target.className == tailwinds.itemDeleteButton){ 
                    this.delete();
                }
                else{
                    this.clicked = e.target;
                    this.className = tailwinds.movingItem;
                }
            }
            else if (e.button == 2){

            }            
        });

        $item.addEventListener("contextmenu", e =>{
            let $itemPop = new ItemPopup(document.getElementById("edit-popup"), this.$el);
            e.preventDefault();
            $itemPop.activate();

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
        document.addEventListener("mouseup", () => {
            if (this.clicked){
                if (this.clicked.className == tailwinds.nameInput){
                    this.name = this.$input.value;
                }
                else{
                    this.smooth(() => {
                        this.reassign();
                    }, "top, height", 500);                     
                }
                
            }
            
        });

        window.addEventListener("resize", () => this.snap(this.day, this.hour));

    }

    delete(){
        let curDay = this.week.days[this.day];
        curDay.removeItem(this);
        
        this.smooth(() => {
            this.set("height", 0, true);
            this.set("width", 0, true);
        },undefined ,500);

        setTimeout(() => this.$el.remove(), 450);
        

    }

    /**
     * @summary adds a smoothing transition
     * @param {Function} callback
     * @param {string} propString
     * @param {number} ms milliseconds
     */
    smooth(callback, propString = "height, width", ms = 1000){
        this.$el.style.transitionProperty = propString;
        this.$el.style.transitionDuration = `${ms}ms`;

        callback();
        setTimeout(() =>{
            this.$el.style.transitionProperty = "";
            this.$el.style.transitionDuration = ""; 
        }, ms);
    }

    /**
     * @summary snaps the item into place and creates it, giving a smooth
     * animation.
     */
    create(x, y){

        this.set("visibility", "hidden");
        this.set("left", x, true);
        this.set("top", y, true);

        this.set("width", 10, true);
        this.set("height", 30, true);

        this.set("visibility", "visible");
        this.reassign(); 
        this.smooth(() => {
            let hourDims = this.week.days[this.day].getHourDims();
            this.set("width", hourDims.width, true);
            this.set("height", hourDims.height * 2, true);
        });


        this.created = true;

    }

}