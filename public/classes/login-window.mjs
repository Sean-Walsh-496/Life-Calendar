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

            console.log(response);
            if (response.status == 401) console.log("wrong password");

            if (response.status == 200) window.location.href = "./yearview.html";

        });
            
        
    }

}