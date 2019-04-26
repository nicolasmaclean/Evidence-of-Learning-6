var canvas = document.getElementById('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

// var par1 = new Particle(100, 200, 4, -4, 80, "blue");
// var par2 = new Particle(500, 400, -3, 3, 100, "black");

window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    init();
})

window.addEventListener('click', () =>{
    init();
})

function checkRepeats(particle, particles){
    for(let i = 0; i < particles.length; i++){
        let temp = particles[i];
        if(getDistance(temp, particle) < temp.radius + particle.radius)
            return true;
    }
    return false;
}

var particles;

function init(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    particles = [];

    for(let i = 0; i < 300; i++){
        let temp;
        do {
            let radius = 10;
            let x = radius + Math.random()*(canvas.width-radius*2);
            let y = radius + Math.random()*(canvas.height-radius*2);
            let dx = Math.random()*4-2;
            let dy = Math.random()*4-2;
            let color = "black";
            temp = new Particle(x, y, dx, dy, radius, color);
        } while(checkRepeats(temp, particles))

        particles.push(temp);
    }
}

function animate(){
    requestAnimationFrame(animate);
    c.fillStyle = "white";
    c.fillRect(0, 0, canvas.width, canvas.height);

    for(let i = 0; i < particles.length; i++){
        particles[i].update();
    }
    for(let i = 0; i < particles.length; i++){
        particles[i].checkCollision();
    }
}

init();
animate();