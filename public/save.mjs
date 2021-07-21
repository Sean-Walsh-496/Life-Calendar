import { functions } from "./util.mjs";

export class SaveButton{
    constructor(week){
        this.week = week;
        this.$el = document.getElementById("save-button");
        this.initEventListeners();
    }

    getSendableWeek(){
        let data = this.week.days;
        let newList = [];
        data.forEach((el, i) => {
            newList.push(functions.copyObject(el, ["week", "$el"]));
            
            newList[i].itemList.forEach((item, j) => {
                if (item !== null){
                    newList[i].itemList[j] = functions.copyObject(item, ["week", "$el", "$input"]);
                }
            });
        });
        
        return JSON.stringify(newList);
    }

    initEventListeners(){
        this.$el.addEventListener("click", () => {
            let data = this.getSendableWeek();
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