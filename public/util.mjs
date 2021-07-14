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


export const functions = {
    /**
     * @param {number} cur 
     * @param {array} available 
     * @param {boolean} rIndex determines whether you should return the index of the
     * closest element and not actually the element itself.
     * @returns {number}
     */
    findClosest : function(cur, available, rIndex = false){
        let closestDist = Number.MAX_VALUE;
        let closestEl, closestIndex;

        let i = 0;
        available.forEach(el => {
            if (Math.abs(cur - el) < closestDist){
                closestDist = Math.abs(cur - el);
                closestEl = el;
                closestIndex = i;
            }
            i++;
        });

        return rIndex ? closestIndex : closestEl;
    },

    /**
     * @summary returns nearest day cell's y-position
     * @param {number} x
     * @param {number} margin if there should be any space to the left and right of the item
     * @param {boolean} stringify
     * @param {boolean} rIndex return index
     * @returns {string}
     */
    findDay : function(x, margin=3, stringify=true, rIndex=false){
        const {findClosest} = this;
        let positions = [];
        let days = Array.from(document.getElementById("day-container").children);

        days.forEach(el => {
            positions.push(el.getBoundingClientRect().left);
        });
        
        let closest = findClosest(x, positions, rIndex);

        if (rIndex) return closest;

        return stringify ? `${closest + margin}px` : closest + margin;
    },

    /**
     * @summary snaps either the bottom or top to the nearest hour
     * @param {number} y
     * @param {number} height pixel value of height
     * @param {boolean} isTop 
     * @param {boolean} rIndex
     * @returns {string}
     */
    findHour : function(y, height, isTop = true, rIndex = false){
        const {findClosest} = this;
        let itemY = isTop ? y : y + height;
        let hours = Array.from(document.getElementsByClassName(tailwinds.day)[0].children[1].children);
        
        let positions = [];

        hours.forEach(el => {
            let bounds = el.getBoundingClientRect();
            let pos = isTop ? bounds.top : bounds.top + bounds.height;
            positions.push(pos);
        });
        
        let closest = findClosest(itemY, positions, rIndex);

        if (rIndex) return closest;

        else return isTop ? `${closest}px` : `${closest - y}px`;
    },
};
