export default class PopupWindow{
    constructor($el){
        this.$el = $el;
        this.height = $el.clientHeight;
        this.width = $el.clientWidth;
        this.active = this.$el.style.visibility == "hidden" ? false : true;
    }

    changeVisibility(){
        let vis = this.$el.style.visibility;

        this.active = !this.active;
        this.$el.style.visibility = (vis == "visible" || vis == '') ? "hidden" : "visible";
    }

    center(){
        this.$el.style.top = `${(window.innerHeight / 2) - this.height / 2}px`;
        this.$el.style.right = `${(window.innerWidth / 2) - this.width / 2}px`;
    }

    position(x, y){
        this.$el.style.top = `${y}px`;
        this.$el.style.left = `${x}px`;
    }


}