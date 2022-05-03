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
function random(max){
    return Math.floor(Math.random() * max);
}
const player = {
    x: 10,
    y:0,
    width:100,
    height:100,
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
    wallCollision(){
        if(this.y < 0){this.y = 0;}
        if(this.y > canvas.height-this.height){this.y = canvas.height-this.height;}
    },
    setAspectRatio: function(){
        this.width = window.innerHeight / 10;
        this.height = window.innerHeight / 10;
    }
};
//plastic textures

class plastic{
    pos = {x:(1200-40), y:0};
    vecMomentum = {x:0, y:0};
    vecMomentumGoal = {x:8, y:0};
    type = 0;
    draw(ctx){
        ctx.fillStyle = "grey";
        ctx.fillRect(this.pos.x, this.pos.y, 40, 40);
    };
    update(deltaTime){
        this.vecMomentum.x = approach(this.vecMomentumGoal.x, this.vecMomentum.x, deltaTime)
        this.pos.x -= this.vecMomentum.x;
    };
    plastic(type, yPos){
        this.type = type;
        this.pos.y = yPos;
    };

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
const makePlastic = true;
let jeff = new plastic(0, 50);
function init(){
    gameLoop();
}
function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(document.getElementById("Background"), 0, 0, 1200, 800);
    player.draw(ctx);
}
function update(deltaTime){
    player.vecMomentum.y = approach(player.vecMomentumGoal.y, player.vecMomentum.y, deltaTime*45)
    player.move(player.vecMomentum.x, player.vecMomentum.y);
    player.wallCollision();

}
let then = Date.now();
function gameLoop(timestamp){
    dt = (((timestamp - then)));
    then = timestamp;
    draw();
    update(dt);
    
    requestAnimationFrame(gameLoop)
}


init();