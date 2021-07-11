import PopupWindow from "./popup.mjs";

export class ItemPopup extends PopupWindow {

    constructor($el){
        super($el);
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
     * @param {MouseEvent} e 
     */
    clickAppear(e){

        if (this.active){
            this.shrink();
            this.changeVisibility();
        }
        else{
            this.position(e.x, e.y);
            this.changeVisibility();
            this.expand();
        }
        
        
    }

}