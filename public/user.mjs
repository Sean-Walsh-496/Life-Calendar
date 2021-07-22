import {functions} from "./util.mjs";
import {Week} from "./time.mjs";


class User{
    constructor(name, years=80){
        this.name = name;
        this.password = null;
        this.years = this.getDefaultYears(years);
        this.templates = {};
    }

    getDefaultYears(numYears){
        let userYears =[];
        for (let i = 0; i < numYears; i++){
            let curYear = []
            for (let j = 0; j < 52; j++){
                curYear.push(new Week());
                curYear[j] = curYear[j].getSendable();
            }
            userYears.push(curYear);
        }
        return userYears;
    }


    getSendable(){
        return {
            name: this.name,
            password: this.password,
            years: this.years,
            templates: this.templates
        };
    }
}