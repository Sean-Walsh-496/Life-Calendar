import PopupWindow from "./popup.mjs";

const finished = new Event("finished");

export class TutorialScreen extends PopupWindow{
    /**
     * 
     * @param {object[]} slides 
     */
    constructor(slides){
        super(document.getElementById("tutorial"));
        this.$header = this.$el.querySelector("h1[name='header']");
        this.$bodyText = this.$el.querySelector("p[name='body-text']");
        this.$previousButton = this.$el.querySelector("button[name='previous-button']");
        this.$nextButton = this.$el.querySelector("button[name='next-button']");
        this.$progressText = this.$el.querySelector("p[name='progress-frac']");
        this.initEventListeners();
        this.slides = slides;
        this.slideIndex = 0;
        
        this.displayIndex();

    }

    /**
     * @summary if the index can be changed to the desired value,
     * it is changed and true is returned, if not it stays the same
     * and false is returned.
     * @param {number} num
     * @returns {boolean} 
     */
    changeIndex(num){
        const {slideIndex} = this;
        if (( slideIndex + num > 0 ) && ( slideIndex + num < this.slides.length )){
            this.slideIndex += num;
            return true;
        }
        else return false;
    }

    displayIndex(){
        const slide = this.slides[this.slideIndex];
        const attributes = ["header", "bodyText"];

        for (let key in slide){
            this[`$${key}`].innerText = slide[key];
        }
        this.$progressText.innerText = `${this.slideIndex + 1}/${this.slides.length}`;

        if (this.slideIndex == this.slides.length - 1){
            this.$nextButton.innerText = "Finish";
        }
        else this.$nextButton.innerText = "Next";
    }

    initEventListeners(){
        this.$nextButton.addEventListener("click", () => {
            if (this.changeIndex(1)){
                this.displayIndex();
            }
            else{
                this.$el.style.opacity = '0';
                this.$el.dispatchEvent(finished);
                setTimeout(() =>{
                    this.$el.style.top = '1vh'
                }, parseInt(this.$el.style.transitionDuration, 10));
                
                
            }

        });

        this.$previousButton.addEventListener("click", () => {
            if (this.changeIndex(-1)){
                this.displayIndex();
            }


        });
    }

    activate(){
        this.$el.style.visibility = "visible";
        this.center();

    }
}

function makeSlide(header, text){
    return {
        header: header,
        bodyText: text
    };
}


export const slides = [
    makeSlide("Welcome to Bloks", 
    "Bloks is a time management tool built around scheduling and optimizing your time so that you can lead a more productive and fulfilling life. If that sounds good to you, continue with the tutorial."),
    makeSlide("The Life Page", 
    "After logging in or registering you will be greeted with the 'life view' page, which enables you to always see the bigger picture. Each row represents a year, and each cell a week. Red cells are already used up."),
    makeSlide("The Week Page", 
    "Next you have the 'week view'. You can add items or events by simply clicking, and then you can adjust their size or drag and drop them into any day column. Additionally, you can edit them with rigth clicking. The save button saves your changes."),

];