export const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export const tailwinds = {
    hour: "w-full h-full border-b border-gray-400",
    day : "flex flex-col w-1/7 h-full border border-gray-400 items-center",
    item : "absolute flex flex-col bg-purple-400 rounded border border-purple-700",
    movingItem : "absolute flex flex-col bg-purple-400 rounded border border-purple-700 shadow-xl transform scale-110 z-50",
    resizer : "w-full h-2 transform duration-300 hover:bg-purple-700",
    nameDiv : "w-full select-none text-white",
    fillerDiv : "h-full w-full",
    weekNameDiv : "flex flex-col w-full h-1/8 border-b border-gray-400 text-center text-2xl font-bold select-none",
    itemDeleteButton: "h-full w-1/4 text-center text-transparent transform select-none duration-500 hover:text-white",
    weekCell: "h-full w-2.5 border border-gray-400 transition duration-75 transform hover:scale-150 hover:bg-blue-300",
    divider: "w-full min h-0.5 h-0.5 bg-gray-400",
    weekCellList: "flex max-w-6xl w-full h-2.5 justify-between items-center",
    nameInput: "w-full text-white select-none bg-purple-400",
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

    /**
     * 
     * @param {string} name 
     * @returns {HTMLElement}
     */
    getTemplate : function(name){
        let temp = document.getElementById(name).content.children[0];
        return document.importNode(temp, true);
    }
};

export const tailwindColors = {
    "red": {
        50: "#FEF2F2", 100: "#FEE2E2", 200: "#FECACA",
        300: "#FCA5A5", 400: "#F87171", 500: "#EF4444",
        600: "#DC2626", 700: "#B91C1C", 800: "#991B1B",
        900: "#7F1D1D"
},
    "purple": {
        50: "#F5F3FF", 100: "#EDE9FE", 200: "#DDD6FE",
        300: "#C4B5FD", 400: "#A78BFA", 500: "#8B5CF6",
        600: "#7C3AED",  700: "#6D28D9", 800: "#5B21B6",
        900: "#4C1D95"
    },
    "blue": {
        50: "#EFF6FF", 100: "#DBEAFE", 200: "#BFDBFE",
        300: "#93C5FD",  400: "#60A5FA", 500: "#3B82F6",
        600: "#2563EB",  700: "#1D4ED8", 800: "#1E40AF",
        900: "#1E3A8A"
    },
    "pink": {
        50: "#FDF2F8", 100: "#FCE7F3", 200: "#FBCFE8",
        300: "#F9A8D4",  400: "#F472B6", 500: "#EC4899",
        600: "#DB2777",  700: "#BE185D", 800: "#9D174D",
        900: "#831843"
    },
    "yellow": {
        50: "#FFFBEB", 100: "#FEF3C7", 200: "#FDE68A",
        300: "#FCD34D", 400: "#FBBF24", 500: "#F59E0B",
        600: "#D97706", 700: "#B45309", 800: "#92400E",
        900: "#78350F"
    },
    "green": {
        50: "#ECFDF5", 100: "#D1FAE5", 200: "#A7F3D0",
        300: "#6EE7B7", 400: "#34D399", 500: "#10B981",
        600: "#059669", 700: "#047857", 800: "#065F46",
        900: "#064E3B"
    },
    "gray": {
        50: "#F9FAFB", 100: "#F3F4F6", 200: "#E5E7EB",
        300: "#D1D5DB", 400: "#9CA3AF", 500: "#6B7280",
        600: "#4B5563", 700: "#374151", 800: "#1F2937",
        900: "#111827"
    },
}