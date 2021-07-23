import {User} from "./user.mjs";


export class LoginWindow{
    constructor(){
        this.$el = document.getElementById("login-box");
        this.$username = document.getElementById("username-input");
        this.$password = document.getElementById("password-input");
        this.$signInButton = document.getElementById("login-button");
        this.initEventListeners();
    }

    initEventListeners(){

        this.$signInButton.addEventListener("mouseover", () =>{
            this.$signInButton.style.transform = "scale(1.1)";
        });

        this.$signInButton.addEventListener("mousedown", () =>{
            this.$signInButton.style.transform = "scale(0.9)"
        });

        const scaleDown = () => this.$signInButton.style.transform = "scale(1.0)";
        
        this.$signInButton.addEventListener("mouseout", scaleDown);
        this.$signInButton.addEventListener("mouseup", scaleDown);
        
        
        this.$signInButton.addEventListener("click", async () =>{
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