var canvas = document.getElementById('canvas');
const colors = ["#0A08FF", "#0457E8", "#06BCFF", "#5D04E8", "#C505FF"];

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

function getRandomColor(){
    return colors[Math.floor(Math.random()*colors.length)];
}

function Circle(x, y, radius, color, radian, velocity, dist) {

    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.radian = radian;
    this.velocity = velocity;
    this.dist = dist;

    this.draw = function(){
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
        c.fillStyle = this.color;
        c.fill();
    }

    this.update = function() {
        this.x = mouse.x + Math.cos(this.radian)*this.dist;
        this.y = mouse.y + Math.sin(this.radian)*this.dist;
        this.radian += velocity;
        this.draw();
    }  
}

var circles = [];

function init(){

    circles = [];

    for(var i = 0; i < 50; i++){
        var radius = 10;
        var x = canvas.width/2;
        var y = canvas.height/2;
        var color = getRandomColor();
        var radian = Math.random() * Math.PI * 2;
        var velocity = .02+Math.random()*.03;
        var rotation = 100 + Math.random()*100;

        circles.push(new Circle(x, y, radius, color, radian, velocity, rotation));
    }
}

function animate(){
    requestAnimationFrame(animate);
    c.fillStyle = "rgba(255, 255, 255, 0.1)";
    c.fillRect(0, 0, window.innerWidth, window.innerHeight);

    for(var i = 0; i < circles.length; i++){
        circles[i].update();
    }
}

init();

animate();