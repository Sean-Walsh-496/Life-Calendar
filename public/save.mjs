import { functions } from "./util.mjs";

export class SaveButton{
    constructor(week){
        this.week = week;
        this.$el = document.getElementById("save-button");
        this.initEventListeners();
    }

    initEventListeners(){
        this.$el.addEventListener("click", () => {
            let data = this.week.getSendable();
            console.log(data);
            fetch("/save", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: data
            })
        });

        this.$el.addEventListener("mousedown", () =>{
            this.$el.style.transform = "scale(0.8)";
        });

        const unscale = () =>{
            this.$el.style.transform = "scale(1)";
        };

        this.$el.addEventListener("mouseout", unscale);
        this.$el.addEventListener("mouseup", unscale);

    }
}