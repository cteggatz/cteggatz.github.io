const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
//canvas.height = window.innerHeight;
//wscanvas.width = window.innerWidth;

let entityStack = new Array();


function approach(goal, current, deltaTime){
    var dif = (goal - current);
    if(dif > deltaTime){
        return current + deltaTime;
    }if(dif < -deltaTime){
        return current-deltaTime;
    }
    return goal;
}
const player = {
    x: 0,
    y:0,
    width:window.innerHeight / 10,
    height:window.innerHeight/10,
    color: "Red",
    vecMomentum : {x : 0, y: 0},
    vecMomentumGoal: {x : 0, y : 0},
    draw: function(ctx){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    },
    move: function(x, y){
        this.x += x;
        this.y += y;
    },
    setAspectRatio: function(){
        this.width = window.innerHeight / 10;
        this.height = window.innerHeight / 10;
    }
};
const plastic = {
    pos: {x:0, y:0},
    vecMomentum : {x:0, y:0},
    vecMomentumGoal : {x:0, y:0},
    aspectRatio: window.innerHeight / 20,
    type: 0,
    draw: function(ctx){},
    move: function(x, y){},
    constructor(){

    },

}


//key listeners
window.addEventListener("keydown", (e) =>{
    if(e.key == "w"){
        player.vecMomentumGoal.y = -8;
    }else if(e.key == "s"){
        player.vecMomentumGoal.y = 8;
    }
})
window.addEventListener("keyup", (e)=>{
    if(e.key == "w" || e.key == "s"){
        player.vecMomentumGoal.y = 0;
    }
})
window.addEventListener("resize", () =>{
    //canvas.height = window.innerHeight;
    //canvas.width = window.innerWidth;
    //player.setAspectRatio();
})


//game loop stuff
const fps = 15;
function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(document.getElementById("Background"), 0, 0, 512, 512);
    player.draw(ctx);
}
function update(deltaTime){
    player.vecMomentum.y = approach(player.vecMomentumGoal.y, player.vecMomentum.y, deltaTime*45)
    player.move(player.vecMomentum.x, player.vecMomentum.y);
}
let then = Date.now();
function gameLoop(timestamp){
    dt = (((timestamp - then)));
    then = timestamp;
    draw();
    update(dt);
    
    requestAnimationFrame(gameLoop)
}
function init(){
    gameLoop();
}


init();