import PopupWindow from "./popup.mjs";

export class WarningPopup extends PopupWindow{
    constructor(){
        super(document.getElementById("warning"));
        this.initEventListeners();
        this.center();
        this.$el.style.top = "100px";
    }

    initEventListeners(){
        window.addEventListener("resize", () => {
            this.center();
            this.$el.style.top = "100px";
        });
    }

}