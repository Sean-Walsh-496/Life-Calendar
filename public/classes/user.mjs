export class User{

    /**
     * 
     * @param {string}name 
     * @param {string} password 
     * @param {string} DOB 
     */
    constructor(name, password, DOB){
        this.name = name;
        this.password = password;
        this.years = {};
        this.templates = {};
        this.DOB = DOB;
    }
    getSendable(){
        return {
            name: this.name,
            password: this.password,
            years: this.years,
            templates: this.templates,
            DOB: this.DOB
        };
    }
}