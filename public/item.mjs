import {hourTailwind, weekdays, dayTailwind} from "./time.mjs";
const itemTailwind = "absolute bg-white rounded border border-gray-400";
const movingItemTailwind = "absolute bg-white rounded border border-gray-400 shadow-md transform scale-110 z-50";

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

        $item.className = itemTailwind;
        $item.style.height = `${hourHeight * this.duration}px`;
        $item.style.width = this.width;
        
        $item.addEventListener("mousedown", e => {
            this.clicked = true;
            e.target.className = movingItemTailwind;
            
        });

        $item.addEventListener("mousemove", e =>{
            if (this.clicked){
               let left = parseInt(e.target.style.left.slice(0, -2));
                let top = parseInt(e.target.style.top.slice(0, -2));
                e.target.style.left = `${left + e.movementX}px`;
                e.target.style.top = `${top + e.movementY}px`; 
            }
            

        });

        $item.addEventListener("mouseup", e => {
            this.clicked = false;
            e.target.className = itemTailwind;
            this.$el.style.left = this.findDay();
            this.$el.style.top = this.findHour();

        });

        $name.innerText = this.name
        $item.appendChild($name);

        
        
        return $item;
    }

    findDay(){
        let closestDist = Number.MAX_VALUE;
        let closestPos;

        this.week.days.forEach(el => {
            let bounds = el.$el.getBoundingClientRect();
            let dayX = bounds.left; 
            let itemX = parseInt(this.$el.style.left.slice(0, -2));

            if (Math.abs(dayX - itemX) < closestDist){
                closestDist = Math.abs(dayX - itemX);
                closestPos = bounds.left;
            }

        });
        
        return `${closestPos + 4}px`;
    }

    findHour(){
        let closestDist = Number.MAX_VALUE;
        let closestPos;

        let hours = document.getElementsByClassName(dayTailwind)[0].children[1].children;

        for (let i = 0; i < hours.length; i++){
            let bounds = hours[i].getBoundingClientRect();
            let hourY = bounds.top, itemY = parseInt(this.$el.style.top.slice(0, -2));

            if (Math.abs(hourY - itemY) < closestDist){
                closestDist = Math.abs(hourY - itemY);
                closestPos = hourY;
            }
        };

        return `${closestPos}px`
    }

    

}