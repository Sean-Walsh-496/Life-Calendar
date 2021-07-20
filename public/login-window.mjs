

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
        
        
        this.$signInButton.addEventListener("click", () =>{
            
        });



    }
}