const $view = document.getElementById("sliding-view");

function randomDepth(){
    return Math.round(Math.random() * 3) + 1;
}

/**
 * @returns {string}
 */
function randomColor(depth, palette = ["gray", "red", "green", "yellow", "purple", "pink", "indigo"], destroy=true){
    let index = Math.round(Math.random() * (palette.length - 1));
    let color = palette[index];
    if (destroy) palette = palette.splice(index, 1);
    
    return ` bg-${color}-${depth}00`
}

/**
 * 
 * @param height how tall the block is
 * @param start the left and top, the left being in pixels and the top being in vh
 * @returns 
 */
function createItem(height, start=[-100, 100]){
    let $item = document.createElement("div");
    let depth = randomDepth();

    $item.style.top = `${start[1]}vh`;
    $item.style.left = `${start[0] - Math.random() * 40}px`;
    $item.style.zIndex = `${depth}`;

    $item.className = "rounded-2xl absolute background-block-loop";
    $item.className += randomColor(depth);
    $item.style.height = `${height}px`;
    $item.style.width = `${144 + (depth * 15)}px`;
    document.body.appendChild($item);
    return $item;
}

function createColumn(time = 30, start=[-100, 100]){
    const originalColors = ["gray", "red", "green", "yellow", "purple", "pink", "indigo"];
    let copyColors = [...originalColors];
    let timeDif = 0;
    const totalTime = time;

    //the setTimeout thread was breaking the original while loop
    const helper = () => {
        if (copyColors.length == 0) copyColors = [...originalColors];
        if (time > 4){
            let height = Math.round(Math.random() * 400) + 100;
            let velocity = (window.innerWidth + height) / totalTime;
            timeDif = height / velocity + 0.2;
            time -= timeDif;
            createItem(height, start);
            setTimeout(() => helper(), timeDif * 1000);

        }

    }
    helper();

}

document.getElementById("to-login").addEventListener("click", () => {
    let curLeft = $view.getBoundingClientRect().left;
    $view.style.left = `${curLeft + window.innerWidth}px`;
    console.log(`${curLeft + window.innerWidth}px`);

});

function main(){
    createColumn();
    createColumn(30, [300, 110]);
    createColumn(30, [700, 110]);
} 

main();


