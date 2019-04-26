function Particle(x, y, dx, dy, radius, color){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = color;
    this.mass = radius/10;

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

function direction(particle){
    var temp = {
        x:"",
        y:""
    }
    if(particle.dx > 0)
        temp.x = "r";
    else
        temp.x = "l";
    if(particle.dy > 0)
        temp.y = "d";
    else
        temp.y = "u";
    return temp;
}

function slowerRU(particle, otherParticle){
    if(particle.x > otherParticle.x && particle.y > otherParticle.y){
        if(particle.dx > otherParticle.dx && particle.dy > otherParticle.dy)
            return true;
    } else if(particle.x > otherParticle.x && particle.y < otherParticle.y){
        if(particle.dx < otherParticle.dx && particle.dy > otherParticle.dy)
            return true;
    } else if(particle.x < otherParticle.x && particle.y > otherParticle.y){
        if(particle.dx > otherParticle.dx && particle.dy < otherParticle.dy)
            return true;
    } else if(particle.x < otherParticle.x && particle.y < otherParticle.y){
        if(particle.dx < otherParticle.dx && particle.dy > otherParticle.dy)
            return true;
    }
}
function slowerRD(particle, otherParticle){
    if(particle.x > otherParticle.x && particle.y > otherParticle.y){
        if(particle.dx > otherParticle.dx && particle.dy > otherParticle.dy)
            return true;
    } else if(particle.x > otherParticle.x && particle.y < otherParticle.y){
        if(particle.dx < otherParticle.dx && particle.dy < otherParticle.dy)
            return true;
    } else if(particle.x < otherParticle.x && particle.y > otherParticle.y){
        if(particle.dx > otherParticle.dx && particle.dy < otherParticle.dy)
            return true;
    } else if(particle.x < otherParticle.x && particle.y < otherParticle.y){
        if(particle.dx > otherParticle.dx && particle.dy > otherParticle.dy)
            return true;
    }
}
function slowerLU(particle, otherParticle){
    if(particle.x > otherParticle.x && particle.y > otherParticle.y){
        if(particle.dx < otherParticle.dx && particle.dy > otherParticle.dy)
            return true;
    } else if(particle.x > otherParticle.x && particle.y < otherParticle.y){
        if(particle.dx < otherParticle.dx && particle.dy < otherParticle.dy)
            return true;
    } else if(particle.x < otherParticle.x && particle.y > otherParticle.y){
        if(particle.dx > otherParticle.dx && particle.dy < otherParticle.dy)
            return true;
    } else if(particle.x < otherParticle.x && particle.y < otherParticle.y){
        if(particle.dx > otherParticle.dx && particle.dy > otherParticle.dy)
            return true;
    }
}
function slowerLD(particle, otherParticle){
    if(particle.x > otherParticle.x && particle.y > otherParticle.y){
        if(particle.dx < otherParticle.dx && particle.dy > otherParticle.dy)
            return true;
    } else if(particle.x > otherParticle.x && particle.y < otherParticle.y){
        if(particle.dx < otherParticle.dx && particle.dy < otherParticle.dy)
            return true;
    } else if(particle.x < otherParticle.x && particle.y > otherParticle.y){
        if(particle.dx > otherParticle.dx && particle.dy > otherParticle.dy)
            return true;
    } else if(particle.x < otherParticle.x && particle.y < otherParticle.y){
        if(particle.dx > otherParticle.dx && particle.dy < otherParticle.dy)
            return true;
    }
}

function approaching(particle, otherParticle){
    const direc1 = direction(particle);
    const direc2 = direction(otherParticle);
    //checks if opposite direction
    switch(direc1.x+direc1.y + " "+ direc2.x+direc2.y){
        //head on
        case "ru ld":
        case "ld ru":

        case "rd lu":
        case "lu rd":

        case "lu rd":
        case "rd lu":

        case "ld ru":
        case "ru ld":
        //approaching but not completely head on
        case "ru rd":
        case "rd ru":

        case "lu ld":
        case "ld lu":

        case "ru lu":
        case "lu ru":

        case "rd ld":
        case "ld rd":
            return true;

        //same direction, but if the one in front is slower
        case "ru ru": 
            return slowerRU(particle, otherParticle);
        case "rd rd": 
            return slowerRD(particle, otherParticle);
        case "lu lu": 
            return slowerLU(particle, otherParticle);
        case "ld ld": 
            return slowerLD(particle, otherParticle);
    }
    return false;
}

function ballCollision(particle, otherParticle){
    if(getDistance(particle, otherParticle) < particle.radius + otherParticle.radius){
        console.log("collision");
        if(approaching(particle, otherParticle)){
            console.log("collision1");
            tempdx1 = particle.dx*(particle.mass-otherParticle.mass)+(2*otherParticle.mass*otherParticle.dx)/(particle.mass+otherParticle.mass)
            tempdy1 = particle.dy*(particle.mass-otherParticle.mass)+(2*otherParticle.mass*otherParticle.dx)/(particle.mass+otherParticle.mass)
            tempdx2 = otherParticle.dx*(otherParticle.mass-particle.mass)+(2*particle.mass*particle.dx)/(particle.mass+otherParticle.mass)
            tempdy2 = otherParticle.dy*(otherParticle.mass-particle.mass)+(2*particle.mass*particle.dy)/(particle.mass+otherParticle.mass)
            
            particle.dx = tempdx1;
            particle.dy = tempdy1;
            otherParticle.dx = tempdx2;
            otherParticle.dy = tempdy2;

            particle.x += particle.dx;
            particle.y += particle.dy;
            otherParticle.x += otherParticle.dx;
            otherParticle.y += otherParticle.dy;
        }
    }
}

function xCollision(particle){
    if((particle.dx < 0 && particle.x - particle.radius < 0) || (particle.x + particle.radius > canvas.width && particle.dx > 0))
        particle.dx = -particle.dx;
}

function yCollision(particle){
    if((particle.y - particle.radius < 0 && particle.dy < 0) || (particle.y + particle.radius> canvas.height && particle.dy > 0))
        particle.dy = -particle.dy;
}

function collision(particle){
    xCollision(particle);
    yCollision(particle);
    for(let i = 0; i < particles.length; i++){
        if(particles[i] === particle) continue;
        ballCollision(particle, particles[i]);
    }
}