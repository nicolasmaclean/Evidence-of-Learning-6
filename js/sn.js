const canvas = document.getElementById("canvas");
const c = canvas.getContext("2d");
const score_span = document.getElementById("score");

const scale = 20;
var rows;
var columns;
var score = 1;

var snake = new Snake(0, 0, scale, 0);
var fruit = new Fruit();

(function setUp(){
    canvas.width = 600;
    canvas.height = 600;

    rows = canvas.height/scale;
    columns = canvas.width/scale;

    fruit.pickLocation();

    window.setInterval(function(){
        c.fillStyle = "slategray";
        c.fillRect(0,0,canvas.width, canvas.height);

        fruit.draw();
        snake.update();

        if(collision(fruit, snake)){
            score++;
            fruit.pickLocation();
            snake.length++;
        }
        if(wallCollision() || snakeCollision()){
            snake.x = 0;
            snake.y = 0;
            snake.dx = 0;
            snake.dy = 0;
            snake.changeDirection("Right");
            //move that to when a new game is started when I add a game over screen
            score = 1;
            snake.tail = [];
            snake.length = 1;
        }
        score_span.innerHTML = "" + score;
    }, 250);
}())

window.addEventListener('keydown', function(event){
    snake.changeDirection(event.key.replace('Arrow', ''));
})

function collision(obj1, obj2){
    if(obj1.x === obj2.x && obj1.y === obj2.y)
        return true;
    else
        return false;
}

function wallCollision(){
    if(snake.x >= canvas.width || snake.x < 0 || snake.y >= canvas.height || snake.y < 0)
        return true;
    else
        return false;
}

function snakeCollision(){
    for(let i = 0; i < snake.tail.length-1; i++){
        if(snake.tail[snake.tail.length-1].x === snake.tail[i].x && snake.tail[snake.tail.length-1].y === snake.tail[i].y)
            return true;
    }
    return false;
}