export class User{
    constructor(name, password, years=80){
        this.name = name;
        this.password = password;
        this.years = {};
        this.templates = {};
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