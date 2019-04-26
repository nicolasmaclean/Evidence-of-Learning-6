var canvas = document.getElementById('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

var mouse = {
    x: undefined,
    y: undefined
}

window.addEventListener('mousemove', 
    function(event){
    mouse.x = event.x;
    mouse.y = event.y;
})

window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    init();
})

function getDistance(x1, x2, y1, y2){
    var xDist = Math.pow(x2-x1, 2);
    var yDist = Math.pow(y2-y1, 2);

    return Math.sqrt(xDist + yDist);
}

function Circle(x, y, radius, color) {

    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;

    this.draw = function(){
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
        c.fillStyle = this.color;
        c.fill();
    }

    this.update = function() {
        this.draw();
    }  
}

var circle1 = new Circle(canvas.width/2, canvas.height/2, 100, "black");
var circle2 = new Circle(50, 50, 50, "blue");

function init(){
    circle1.update();
    circle2.update();
}

function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0, 0, window.innerWidth, window.innerHeight);

    if(getDistance(circle1.x, circle2.x, circle1.y, circle2.y) < 150)
        circle1.color = "red";
    else
        circle1.color = "black";

    circle1.update();
    circle2.x = mouse.x;
    circle2.y = mouse.y;
    circle2.update();
}

init();
animate();