import PopupWindow from "./popup.mjs";
import { tailwindColors } from "./util.mjs"; 

export class ItemPopup extends PopupWindow {

    constructor($el){
        super($el);
        this.$cur = null;
        this.$colorPalette = document.getElementById("color-palette");

        this.standardDims = {height: 150, width: 150};
        this.itemOffset = [15, 10];

        this.initEventListeners();
        
    }

    changeItemColor($item, newColor){

        const colorObj = tailwindColors[newColor];

        let hasBorder = Array.from($item.classList).findIndex(el => el.indexOf("border")) != -1;
        let hasBgColor = Array.from($item.classList).findIndex(el => el.indexOf("bg-")) != -1

        if (hasBgColor) $item.style.backgroundColor = colorObj[400];
        if (hasBorder) $item.style.borderColor = colorObj[700];
        
        Array.from($item.children).forEach(el => {
            this.changeItemColor(el, newColor);
        });

    }

    initEventListeners(){
        this.$el.addEventListener("click", e => {
            if (e.target.tagName == "BUTTON" && this.$colorPalette.contains(e.target)){
                this.changeItemColor(this.$cur, e.target.dataset.color);

            }
        });

        document.addEventListener("click", e => {
            if (! this.$el.contains(e.target) && e.target !== this.$cur){
                this.deactivate();
            }
        });

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
        $el.style.height = `${0}px`;
        $el.style.width = `${0}px`;

    }

    /**
     * @returns {array}
     */
    getItemPos(){
        let bounds = this.$cur.getBoundingClientRect();
        let {itemOffset} = this;

        return [bounds.right + itemOffset[0], bounds.top + itemOffset[1]];
    }

    /**
     * @summary Called whenever the used right-clicks on an item to see the 
     * custom context menu.
     * @param {MouseEvent} e
     */
    activate($item){
        this.$el.style.visibility = "visible";
        this.$cur = $item;
        this.position(...this.getItemPos());
        this.$el.style.width = `${this.standardDims.width}px`;
        this.$el.style.height = `${this.standardDims.height}px`;
        this.$el.style.color = "black";
    }

    deactivate(){
        this.$cur = null;
        this.shrink();
        this.$el.style.color = "transparent";

    }

}