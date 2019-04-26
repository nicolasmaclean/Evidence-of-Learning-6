function Particle(x, y, dx, dy, radius, color){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = color;
    this.mass = radius;

    this.draw = function(){
        c.beginPath();
        c.fillStyle = color;
        c.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
        c.fill();
    }

    this.update = function(){
        this.x += this.dx;
        this.y += this.dy;

        this.draw();
    }

    this.checkCollision = function(){
        collision(this);
    }
}

function getDistance(particle, otherParticle){
    let xSq = Math.pow(particle.x-otherParticle.x, 2);
    let ySq = Math.pow(particle.y-otherParticle.y, 2);

    return Math.sqrt(xSq + ySq);
}

function ballCollision(particle, otherParticle){
    if(getDistance(particle, otherParticle) < particle.radius + otherParticle.radius){
        particle.dx = (particle.dx * (particle.mass - otherParticle.mass) + (2 * otherParticle.mass * otherParticle.dx)) / (particle.mass + otherParticle.mass);
        particle.dy = (particle.dy * (particle.mass - otherParticle.mass) + (2 * otherParticle.mass * otherParticle.dy)) / (particle.mass + otherParticle.mass);
        otherParticle.dx = (otherParticle.dx * (otherParticle.mass - particle.mass) + (2 * particle.mass * particle.dx)) / (particle.mass + otherParticle.mass);
        otherParticle.dy = (otherParticle.dy * (otherParticle.mass - particle.mass) + (2 * particle.mass * particle.dy)) / (particle.mass + otherParticle.mass);

        while(getDistance(particle, otherParticle) < particle.radius + otherParticle.radius){
            particle.x += particle.dx;
            particle.y += particle.dy;
            // otherParticle.x += otherParticle.dx;
            // otherParticle.y += otherParticle.dy;
        }
    }
}

function xCollision(particle){
    //wall bounce
    // if((particle.dx < 0 && particle.x - particle.radius < 0) || (particle.x + particle.radius > canvas.width && particle.dx > 0))
    //     particle.dx = -particle.dx;
    //move to other side
    console.log("x");
    if(particle.x - particle.radius < 0){
        particle.x = canvas.width-particle.radius;
    }
    if(particle.x + particle.radius > canvas.width){
        particle.x = particle.radius;
    }
}

function yCollision(particle){
    //wall bounce
    // if((particle.y - particle.radius < 0 && particle.dy < 0) || (particle.y + particle.radius> canvas.height && particle.dy > 0))
    //     particle.dy = -particle.dy;
    //move to other side
    if(particle.y - particle.radius < 0)
        particle.y = canvas.height-particle.radius;
    if(particle.y + particle.radius > canvas.height)
        particle.y = particle.radius;
}

function collision(particle){
    xCollision(particle);
    yCollision(particle);
    for(let i = 0; i < particles.length; i++){
        if(particles[i] === particle) continue;
        ballCollision(particle, particles[i]);
    }
}