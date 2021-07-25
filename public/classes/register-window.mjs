import { LandingPageBox } from "./landing-page-box.mjs";

export class RegisterWindow extends LandingPageBox{
    constructor(){
        super(document.getElementById("register-box"));
        this.$month = this.$el.querySelector("input[name='DOB-m']");
        this.$day = this.$el.querySelector("input[name='DOB-d']");
        this.$year = this.$el.querySelector("input[name='DOB-y']");
        this.initExtraEventHandlers();

    }

    initExtraEventHandlers(){
        this.$goBackButton.addEventListener("click", () =>{
            let $view = document.getElementById("sliding-view");
            let curLeft = $view.getBoundingClientRect().left;
            $view.style.left = `${curLeft + window.innerWidth}px`;        
        });
    }
}