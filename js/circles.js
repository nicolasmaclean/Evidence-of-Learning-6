var canvas = document.getElementById('canvas');
const colors = ["red", "orange", "yellow", "green", "blue", "purple", "pink"];

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

function getRandomColor(){
    return Math.floor(Math.random()*16777215).toString(16);
}

function Circle(x, y, dx, dy, radius, color) {

    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = color;

    this.draw = function(){
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
        c.fillStyle = "#" + this.color;
        c.fill();
    }

    this.update = function() {
        this.x += this.dx;
        this.y += this.dy;
        
        if(this.x+radius > window.innerWidth || this.x-radius < 0){
            this.dx = -this.dx;
            this.color = getRandomColor();
        }
        if(this.y+radius > window.innerHeight || this.y-radius < 0){
            this.dy = -this.dy;
            this.color = getRandomColor();
        }

        this.draw();
    }  
}

var circles = [];

for(var i = 0; i < 100; i++){
    var radius = Math.floor(Math.random()*25);
    var x = radius + Math.floor(Math.random()*(window.innerWidth-radius*2));
    var y = radius + Math.floor(Math.random()*(window.innerHeight-radius*2));
    var dx = Math.floor(-(1+Math.random()*3));
    var dy = Math.floor(-(1+Math.random()*3));
    var color = getRandomColor();
    
    if(dx > -.5 || dx < .5)
        dx = dx*3;
    if(dy > -.5 || dy < .5)
        dy = dy*3;
    
    circles.push(new Circle(x, y, dx, dy, radius, color));
}

for(var i = 0; i < 100; i++){
    var radius = Math.floor(Math.random()*25);
    var x = radius + Math.floor(Math.random()*(window.innerWidth-radius*2));
    var y = radius + Math.floor(Math.random()*(window.innerHeight-radius*2));
    var dx = Math.floor(1+Math.random()*3);
    var dy = Math.floor(1+Math.random()*3);
    var color = getRandomColor();
    
    if(dx > -.5 || dx < .5)
        dx = dx*3;
    if(dy > -.5 || dy < .5)
        dy = dy*3;
    
    circles.push(new Circle(x, y, dx, dy, radius, color));
}

function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0, 0, window.innerWidth, window.innerHeight);

    for(var i = 0; i < circles.length; i++){
        circles[i].update();
    }
}

animate();