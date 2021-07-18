import PopupWindow from "./popup.mjs";

export class ItemPopup extends PopupWindow {

    constructor($el, $item){
        super($el);
        this.$item = $item;
        this.standardDims = {height: 150, width: 150};
        this.itemOffset = [15, 10];
        
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
     * @returns {array}
     */
    getItemPos(){
        let bounds = this.$item.getBoundingClientRect();
        let {itemOffset} = this;

        return [bounds.right + itemOffset[0], bounds.top + itemOffset[1]];
    }

    /**
     * @summary Called whenever the used right-clicks on an item to see the 
     * custom context menu.
     * @param {MouseEvent} e
     */
    activate(){
        this.position(...this.getItemPos());
        this.$el.style.width = `${this.standardDims.width}px`;
        this.$el.style.height = `${this.standardDims.height}px`;
    }

    deactive(){
        
    }

}