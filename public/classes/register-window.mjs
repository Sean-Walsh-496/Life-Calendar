import { LandingPageBox } from "./landing-page-box.mjs";

export class RegisterWindow extends LandingPageBox{
    constructor(){
        super(document.getElementById("register-box"));
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