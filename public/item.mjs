
const itemTailwind = "w-block absolute bg-white rounded border border-gray-400 h-16 m-1.5 shadow-md";

export class Item{
    /**
     * 
     * @param {string} name
     * @param {object} time
     * @param {object} duration
     */
    constructor(name, time, duration){
        this.name = name;
        this.time = time;
        this.duration = duration;
        this.$el = this.getElement();
    }

    getElement(){
        let x = document.createElement("div");
        x.className = itemTailwind;
        let $name = document.createElement("h2");
        $name.innerText = this.name
        x.appendChild($name);
        return x;
    }

    

}