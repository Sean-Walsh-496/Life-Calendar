import { LandingPageBox } from "./landing-page-box.mjs"; 
import { User } from "./user.mjs";
import { functions } from "../util.mjs";

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


        this.$mainButton.addEventListener("click", async () => {

            let response = await fetch("/register", {
                method: "POST",
                headers: {
                        "Content-Type": "application/json",
                },
                body : JSON.stringify({name: this.$username.value, password: this.$password.value})
                });

            response = await response.text();
            if (response === "this username is taken") functions.transmitToWarning(response);

            else window.location.href = "./yearview.html";

        });

    }
}