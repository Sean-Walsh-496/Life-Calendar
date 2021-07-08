
const itemTailwind = "w-10/12 rounded border-2 border-gray-400 h-10";

export class Item{
    /**
     * 
     * @param {string} name
     * @param {object} time
     * @param {object} duration
     */
    constructor(name, time, duration){
        this.$el = this.getElement();
        this.name = name;
        this.time = time;
        this.duration = duration;

    }

    getElement(){
        let x = document.createElement("div");
        x.className = itemTailwind;
        return x;
    }

    

}