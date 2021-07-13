export const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export const tailwinds = {
    hour: "w-full h-full border-b border-gray-400",
    day : "flex flex-col w-1/7 h-full border border-gray-400 items-center",
    item : "absolute flex flex-col bg-purple-400 rounded border border-gray-400",
    movingItem : "absolute flex flex-col bg-purple-400 rounded border border-gray-400 shadow-md transform scale-110 z-50",
    resizer : "w-full h-2 transform duration-300 hover:bg-purple-700",
    nameDiv : "w-full select-none text-white",
    fillerDiv : "h-full w-full",
    weekNameDiv : "flex flex-col w-full h-1/8 border-b border-gray-400 text-center text-2xl font-bold select-none",
}


/**
 * @param {number} cur 
 * @param {array} available 
 * @returns {number}
 */
export function findClosest(cur, available){
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
 * @param {number} x
 * @returns {string}
 */
export function findDay(x, margin=3, stringify=true){
    let positions = [];
    let days = Array.from(document.get)

    this.week.days.forEach(el => {
        positions.push(el.$el.getBoundingClientRect().left);
    });
    
    return stringify ? `${findClosest(x, positions) + margin}px` : findClosest(x, positions) + margin;
}

function findHour(y){

}


/**
 * @summary snaps either the bottom or top to the nearest hour
 * @param {number} y
 * @param {boolean} isTop 
 * @returns {string}
 */
export function findHour(y, isTop = true){
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