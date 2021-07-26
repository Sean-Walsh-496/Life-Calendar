import { User } from "./user.mjs";
import { LandingPageBox } from "./landing-page-box.mjs";
import { functions } from "../util.mjs";


export class LoginWindow extends LandingPageBox{
    constructor(){
        super(document.getElementById("login-box"));
        this.initExtraEventHandlers();
    }

    isValidInput(){
        let alphanumInputs = [this.$username, this.$password];
        return alphanumInputs.every(el => el.value != "");
    }

    initExtraEventHandlers(){
        this.$goBackButton.addEventListener("click", () =>{
            let $view = document.getElementById("sliding-view");
            let curLeft = $view.getBoundingClientRect().left;
            $view.style.left = `${curLeft - window.innerWidth}px`;
        });    
        
        this.$mainButton.addEventListener("click", async () =>{

            if (! this.isValidInput()){
                functions.transmitToWarning("Invalid user input");
                return;
            }

            let response = await fetch("/login", {
                method: "POST",
                headers: {
                        "Content-Type": "application/json",
                },
                body : JSON.stringify({name:this.$username.value, password: this.$password.value})
                });

            response = await response.text();

            if (response === "valid") window.location.href = "./yearview.html";

            else functions.transmitToWarning(response);

        });
            
        
    }

}