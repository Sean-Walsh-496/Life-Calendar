import { User } from "./user.mjs";
import { LandingPageBox } from "./landing-page-box.mjs";


export class LoginWindow extends LandingPageBox{
    constructor(){
        super(document.getElementById("login-box"));
        this.initExtraEventHandlers();
    }

    initExtraEventHandlers(){
        this.$goBackButton.addEventListener("click", () =>{
            let $view = document.getElementById("sliding-view");
            let curLeft = $view.getBoundingClientRect().left;
            $view.style.left = `${curLeft - window.innerWidth}px`;
        });    
        
        this.$mainButton.addEventListener("click", async () =>{
            const user = new User(this.$username.value, this.$password.value);

            let response = await fetch("/login", {
                method: "POST",
                headers: {
                        "Content-Type": "application/json",
                },
                body : JSON.stringify(user.getSendable())
                });

            response = await response.text();

            if (response === "password is invalid") console.log("wrong password");

            else if (response === "user does not exist") console.log("user is invalid");

            else if (response === "valid") window.location.href = "./yearview.html";

        });
            
        
    }

}