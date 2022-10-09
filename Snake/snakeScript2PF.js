"use strict"

document.addEventListener("keydown", keyPress)

const canvas = document.getElementById("game");
const context = canvas.getContext("2d");
const width = canvas.width;
const height = canvas.height;




let tiles = 20;
let tileSize = 500 / tiles - 3;
// ___________________________________________________________________________________________________________
// PLAYER 1
const snakelst = []; //constant because we are modifying the ELEMENTS of the list only,
let tail = 0;
let Hx = 6; 
let Hy = 10;

let Ax = 15;
let Ay = 15;

let Vx = 0;
let Vy = 0;

let score = 0;
// ___________________________________________________________________________________________________________
// PLAYER 2
const snakelst2 = []; //constant because we are modifying the ELEMENTS of the list only,
let tail2 = 0;
let Hx2 = 13; 
let Hy2 = 10;

let Ax2 = 15;
let Ay2 = 15;

let Vx2 = 0;
let Vy2 = 0;

let score2 = 0;
//___________________________________________________________________________________________________________


function game() {
    globalThis.speed = document.getElementById("slider").value;
   
        snakePosition();
        if (gameOver()) {
            context.fillStyle = "white"
            context.font = "60px Impact"
            context.fillText("GAME OVER", width - 350, height / 2)
            context.font = "20px Impact"
            context.fillText("Press ENTER key to restart", width - 300, height/2 + 80)
            document.addEventListener('keyup', function onEvent(e) {
                if (e.keyCode === 13) {
                    window.location.reload()
                }
            });
          
            return
            
        }

        clear();

        appleCollision();

        snake1();
        snake2();

        apple();

        scoreUpdate();
        speedUpdate();

        setTimeout(game, 1000 / speed );
}

function clear() {
    context.fillStyle = "black";
    context.fillRect(0, 0, width, height);
}

function snake1() {
    context.fillStyle = "#39FF14"
    context.fillRect(Hx * tiles, Hy * tiles, tileSize, tileSize)
}

function snake2() {
    context.fillStyle = "blue"
    context.fillRect(Hx2 * tiles, Hy2 * tiles, tileSize, tileSize)
}

function apple() {
    context.fillStyle = "#FF3131"
    context.fillRect(Ax * tiles, Ay * tiles, tileSize, tileSize)
    // Setting up the tail of the snake (player 1)
    for(let i = 0 ; i < snakelst.length ; i++) {
        let piece = snakelst[i];
        context.fillStyle = "#39FF14"
        context.fillRect(piece.x * tiles, piece.y * tiles, tileSize, tileSize)
    }
    snakelst.push({x : Hx, y : Hy})
    while(snakelst.length > tail) {
        snakelst.shift();
    }
    // Repeating the same for player 2

    for(let i = 0 ; i < snakelst2.length ; i++) {
        let piece = snakelst2[i];
        context.fillStyle = "blue"
        context.fillRect(piece.x * tiles, piece.y * tiles, tileSize, tileSize)
    }
    snakelst2.push({x : Hx2, y : Hy2})
    while(snakelst2.length > tail2) {
        snakelst2.shift();
    }
}

function appleCollision() {
    if (Hx === Ax && Hy === Ay){
        Ax = Math.ceil(Math.random() * tiles - 1); // Math.random gives a random float between 0 and 1.
        Ay = Math.ceil(Math.random() * tiles - 1); // We multiply by tiles to get it between 0 and 20. 
        score += 1;
        tail += 1;
    }
    // Same stuff for P2
    if (Hx2 === Ax && Hy2 === Ay){
        Ax = Math.ceil(Math.random() * tiles- 1); // Math.random gives a random float between 0 and 1.
        Ay = Math.ceil(Math.random() * tiles- 1); // We multiply by tiles to get it between 0 and 20. 
        score2 += 1;
       tail2 += 1;                              
    }
    console.log(Ax, Ay);
}


function scoreUpdate() {
    context.fillStyle = "white";
    context.font = "15px Courier";
    context.fillText(" Score", width - 100, 20); // Player1 Score update
    context.fillText("P1 │ P2", width - 100, 40); // Player2 Score update
    context.fillText(score +"  │  " + score2, width - 100, 55); // Player2 Score update

}



function speedUpdate() {
    context.fillStyle = "white";
    context.font = "15px Courier";
    context.fillText("Speed: " + speed, width - 100, height - 20)
}

function gameOver() {
    if(Vy === 0 && Vx === 0 ) {return false}
    if(Vy2 === 0 && Vx2 === 0 ) {return false}
    for(let i = 0 ; i < snakelst.length ; i ++) {                           
        if(snakelst[i].x === Hx && snakelst[i].y === Hy) {return true}     
    }              
    for(let i = 0 ; i < snakelst2.length ; i ++) {                           
        if(snakelst2[i].x === Hx2 && snakelst2[i].y === Hy2) {return true}     
    }                                                          
    return false                                                           
}

function snakePosition() {
    //PLAYER 1 Position
    Hx += Vx
    Hy += Vy
    if(Hx === 20) {Hx = 0} // Moving the snake back into frame.
    if(Hy === 20) {Hy = 0}
    if(Hx === -1) {Hx = 20}
    if(Hy === -1) {Hy = 20}

    //PLAYER 2 Position
    Hx2 += Vx2
    Hy2 += Vy2
    if(Hx2 === 20) {Hx2 = 0} // Moving the snake back into frame.
    if(Hy2 === 20) {Hy2 = 0}
    if(Hx2 === -1) {Hx2 = 20}
    if(Hy2 === -1) {Hy2 = 20}
}
 

function keyPress(e) {
    // PLAYER 1: ARROWS

    if(e.keyCode === 40){  //Arrow down
        if(Vy === -1) {return}
        Vy = 1
        Vx = 0
    }

    if(e.keyCode === 38){  //Arrow up
        if(Vy === 1) {return}
        Vy = -1
        Vx = 0
    }

    if(e.keyCode === 37){  //Arrow left
        if(Vx === 1) {return}
        Vy = 0
        Vx = -1
    }

    if(e.keyCode === 39){  //Arrow right
        if(Vx === -1) {return}
        Vy = 0
        Vx = 1
    }
    
    // PLAYER 2: WASD

    if(e.keyCode === 83) { //S, down
        if(Vy2 === -1) {return}
        Vy2 = 1
        Vx2 = 0
    }

    if(e.keyCode === 87){  //W, up
        if(Vy2 === 1) {return}
        Vy2 = -1
        Vx2 = 0
    }

    if(e.keyCode === 65){  //A, left
        if(Vx2 === 1) {return}
        Vy2 = 0
        Vx2 = -1
    }

    if(e.keyCode === 68){  //D, right
        if(Vx2 === -1) {return}
        Vy2 = 0
        Vx2 = 1
    }

}

game()
