export class SaveButton{
    constructor(week){
        this.week = week;
        this.$el = document.getElementById("save-button");
        this.initEventListeners();
    }

    getSendableWeek(){
        let data = this.week.days;
        data.forEach((el, i) => {
            delete data[i].week;
            
            el.itemList.forEach((item, j) => {
                if (item !== null){
                    delete el.itemList[j].week;
                }    
            });
        });
        
        return JSON.stringify(data);
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
        })
    }
}