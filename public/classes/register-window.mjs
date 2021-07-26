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

    isValidDate($el, type){
        type = type.toLowerCase();
        let value = parseInt($el.value);

        if (!isNaN(value)){
            if (type == "day" || type == 'd'){
                return value > 0 && value < 32; // sus
            }
            else if (type == "month" || type == 'm'){
                return value > 0 && value < 13;
            }
            else if (type == "year" || type == 'y'){
                let curYear = parseInt(new Date().getFullYear());
                return value > curYear - 80 && value < curYear;
            }
            else {
                console.error(`Invalid date type (${type}) passed in!`)
                return false;
            }  
        }

        return false;
    }

    isValidInput(){
        let alphanumInputs = [this.$username, this.$password];
        let numericInputs = [[this.$month, 'm'], [this.$day, 'd'], [this.$year, 'y']];

        return (alphanumInputs.every(el => el.value != "")
                                && 
                numericInputs.every(el => this.isValidDate(...el)));
    }

    initExtraEventHandlers(){
        this.$goBackButton.addEventListener("click", () =>{
            let $view = document.getElementById("sliding-view");
            let curLeft = $view.getBoundingClientRect().left;
            $view.style.left = `${curLeft + window.innerWidth}px`;        
        });


        this.$mainButton.addEventListener("click", async () => {

            if (! this.isValidInput()){
                functions.transmitToWarning("invalid user input");
                return;
            }

            let {$year, $month, $day} = this;
            const date = new Date($year.value, $month.value - 1, $day.value);
            const user = new User(this.$username.value, this.$password.value, date.toISOString());


            let response = await fetch("/register", {
                method: "POST",
                headers: {
                        "Content-Type": "application/json",
                },
                body : JSON.stringify(user.getSendable())
                });

            response = await response.text();
            if (response === "this username is taken") functions.transmitToWarning(response);

            else window.location.href = "./yearview.html";

        });

    }
}