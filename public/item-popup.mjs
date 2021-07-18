import PopupWindow from "./popup.mjs";

export class ItemPopup extends PopupWindow {

    constructor($el, $item){
        super($el);
        this.$item = $item;
        this.standardDims = {height: 150, width: 150};
        
    }

    /**
     * 
     * @param {number} newW 
     * @param {number} newH 
     */
    expand(newW=200, newH=200){
        this.$el.style.height = `${newH}px`;
        this.$el.style.width = `${newW}px`;


    }

    shrink(){
        let {$el, standardDims} = this;
        $el.style.height = `${standardDims.height}px`;
        $el.style.width = `${standardDims.width}px`;

    }

    /**
     * @summary Called whenever the used right-clicks on an item to see the 
     * custom context menu.
     * @param {MouseEvent} e
     */
    activate(e){
        this.position(e.x, e.y);
        this.$el.style.width = `${this.standardDims.width}px`;
        this.$el.style.height = `${this.standardDims.height}px`;
    }

    deactive(){
        
    }

}