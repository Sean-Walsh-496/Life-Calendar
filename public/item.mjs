import {hourTailwind, weekdays, dayTailwind} from "./time.mjs";
const itemTailwind = "absolute flex flex-col bg-white rounded border border-gray-400";
const movingItemTailwind = "absolute flex flex-col bg-white rounded border border-gray-400 shadow-md transform scale-110 z-50";
const resizerTailwind = "w-full h-2 transform duration-300 hover:bg-blue-300";

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
        
        this.clicked = false;
        this.week = null;
        this.$el = this.getElement();
    }

    getElement(){
        const hourHeight = document.getElementsByClassName(hourTailwind)[0].clientHeight;
        let $item = document.createElement("div");
        let $name = document.createElement("h2");
        let $topResizer = document.createElement("div");
        let $bottomResizer = document.createElement("div");
        let $bottomDiv = document.createElement("div");


        $item.className = itemTailwind;
        $item.style.height = `${hourHeight * this.duration}px`;
        $item.style.width = this.width;
        
        $item.addEventListener("mousedown", e => {
            this.clicked = true;
            $item.className = movingItemTailwind;
            
        });

        $item.addEventListener("mousemove", e =>{
            if (this.clicked){
                let left = parseInt($item.style.left.slice(0, -2));
                let top = parseInt($item.style.top.slice(0, -2));
                $item.style.left = `${left + e.movementX}px`;
                $item.style.top = `${top + e.movementY}px`; 
            }
            

        });

        $item.addEventListener("mouseup", e => {
            this.clicked = false;
            $item.className = itemTailwind;
            this.$el.style.left = this.findDay();
            this.$el.style.top = this.findHour();

        });

        $name.innerText = this.name

        $topResizer.className = resizerTailwind;
        $bottomDiv.className = "h-full w-full"
        $bottomResizer.className = resizerTailwind;

        $item.appendChild($topResizer);
        $item.appendChild($name);
        $item.appendChild($bottomDiv)
        $item.appendChild($bottomResizer);

        
        
        return $item;
    }

    /**
     * @param {number} cur 
     * @param {array} available 
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

    findHour(){
        let itemY = parseInt(this.$el.style.top.slice(0, -2));
        let hours = Array.from(document.getElementsByClassName(dayTailwind)[0].children[1].children);
        
        let positions = [];

        hours.forEach(el => {
            positions.push(el.getBoundingClientRect().top);
        });
            
        return `${this.findClosest(itemY, positions)}px`
    }

    

}