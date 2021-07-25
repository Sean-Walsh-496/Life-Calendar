
export class LandingPageBox{
    constructor($el){
        this.$el = $el;
        this.$username = this.$el.querySelector("input[name='username-input']");
        this.$password = this.$el.querySelector("input[name='password-input']");
        this.$goBackButton = this.$el.querySelector("button[name='to-landing']");
        this.$mainButton = this.$el.querySelector("button[name='main-button']");
        this.initBaseEventHandlers();
        
    }

    initBaseEventHandlers(){
        this.$mainButton.addEventListener("mouseover", () =>{
            this.$mainButton.style.transform = "scale(1.1)";
        });

        this.$mainButton.addEventListener("mousedown", () =>{
            this.$mainButton.style.transform = "scale(0.9)"
        });

        const scaleDown = () => this.$mainButton.style.transform = "scale(1.0)";
        
        this.$mainButton.addEventListener("mouseout", scaleDown);
        this.$mainButton.addEventListener("mouseup", scaleDown);
    }
}