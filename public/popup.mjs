export default class PopupWindow{
    constructor($el){
        this.$el = $el;
        this.height = $el.clientHeight;
        this.width = $el.clientWidth;
    }

    changeVisibility(){
        this.$el.style.visibility = (this.$el.style.visibility == "visible") ? "hidden" : "visible";
    }

    center(){
        this.$el.style.top = `${(window.innerHeight / 2) - this.height / 2}px`;
        this.$el.style.right = `${(window.innerWidth / 2) - this.width / 2}px`;
    }


}