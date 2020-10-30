function timerUpdate() // update loop for game
{

    // change in offset for lamb and wolf
    let dy_lamb = Y_Lamb_Direction * Lamb_Move_Y * Lamb_Y_STEP;
    let dx_lamb = X_Lamb_Direction * Lamb_Move_X * Lamb_X_STEP;
    const dy_wolf = new Array();
    dy_wolf[0] + Y_Wolf_Direction * Wolf_Move * Wolf_Y_STEP;
    let dx_wolf = X_Wolf_Direction * Wolf_Move * Wolf_X_STEP;

    //wait for next key press to move lamb
    Lamb_Move_X = 0;
    Lamb_Move_Y = 0;

    setNewPosition(lamb, dx_lamb, dy_lamb);
    setNewPosition(wolf, dx_wolf, dy_wolf);


    myTime = setTimeout('timerUpdate()', 10);

    wolf_place.innerHTML = wolf.offsetLeft + "," + wolf.offsetTop;
    lamb_place.innerHTML = lamb.offsetLeft + "," + lamb.offsetTop;

    if (cross(wolf, lamb)) {
        let thisDuration = new Date() - startTime;
        restart();
        let score = hits.innerHTML;
        score = Number(score) + 1;
        hits.innerHTML = score;
        //window.log("Game Over!");
        let currentDuration = duration.innerHTML;
        if (currentDuration !== "?") {
            currentDuration = Number(duration.innerHTML);
            if (thisDuration < currentDuration) thisDuration = currentDuration;
        }
        document.getElementById("duration").innerHTML = thisDuration;
    }
}

// when key is pressed  (user input)
function keyDownHandler(e) {


    if (e.keyCode == KEYRIGHT) {
        X_Lamb_Direction = 1;
        Lamb_Move_X = 1;
    } // right key
    if (e.keyCode == KEYLEFT) {
        X_Lamb_Direction = -1;
        Lamb_Move_X = 1;
    } // left key

    if (e.keyCode == KEYUP) {
        Y_Lamb_Direction = -1;
        Lamb_Move_Y = 1;
    } // up key
    if (e.keyCode == KEYDOWN) {
        Y_Lamb_Direction = 1;
        Lamb_Move_Y = 1;
    } // up key

}

function restart() {
    startTime = new Date();

    //init directions and mouvement
    Lamb_Direction = 1;
    Wolf_Direction = 1;

    Lamb_Move_X = 0;
    Lamb_Move_Y = 0;
    Wolf_Move = 1;


    clearTimeout(myTime);


    //calculate initial lamb and wolf position
    let coef = Math.random();
    let Lamb_X_INIT = board.offsetLeft + coef * boardWidth;

    coef = Math.random();
    let Lamb_Y_INIT = board.offsetTop + coef * boardHeight;

    coef = Math.random();
    let Wolf_X_INIT = board.offsetLeft + coef * boardWidth;

    coef = Math.random();
    let Wolf_Y_INIT = board.offsetTop + coef * boardHeight;

    //set initial positions
    lamb.style.left = Lamb_X_INIT + "px";
    lamb.style.top = Lamb_Y_INIT + "px";
    wolf.style.left = Wolf_X_INIT + "px";
    wolf.style.top = Wolf_Y_INIT + "px";

    //init position display
    lamb_place.innerHTML = "...";
    wolf_place.innerHTML = "...";


    // Add an event listener to the keypress event.
    document.addEventListener("keydown", keyDownHandler, false);

    timerUpdate();
}




function cross(element1, element2) {
    e1Left = element1.offsetLeft; //i1x
    e1Top = element1.offsetTop; //i1y
    e1Right = element1.offsetLeft + element1.offsetWidth; //r1x
    e1Bottom = element1.offsetTop + element1.offsetHeight; //r1y

    e2Left = element2.offsetLeft; //i2x
    e2Top = element2.offsetTop; //i2y
    e2Right = element2.offsetLeft + element2.offsetWidth; //r2x
    e2Bottom = element2.offsetTop + element2.offsetHeight; //r2y

    x_overlap = Math.max(0, Math.min(e1Right, e2Right) - Math.max(e1Left, e2Left));
    y_overlap = Math.max(0, Math.min(e1Bottom, e2Bottom) - Math.max(e1Top, e2Top));
    overlapArea = x_overlap * y_overlap;

    if (overlapArea == 0) return false;
    return true;

}