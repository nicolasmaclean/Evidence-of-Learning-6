function Snake(x, y, dx, dy){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.length = 1;
    this.tail = [];
    var direction = "Right";

    this.draw = function(){
        c.fillStyle = "green";
        for(let i = 0; i < this.tail.length; i++){
            c.fillRect(this.tail[i].x+1, this.tail[i].y+1, scale-2, scale-2);
        }
    }

    this.update = function(){
        for(let i = 0; i < this.tail.length-1; i++){
            this.tail[i] = this.tail[i+1];
        }
        this.tail[this.length-1] = {
            x: this.x, 
            y: this.y}
        
        switch(direction){
            case "Up": this.dy = -scale; this.dx = 0; break;
            case "Down": this.dy = scale; this.dx = 0; break;
            case "Left": this.dy = 0; this.dx = -scale; break;
            case "Right": this.dy = 0; this.dx = scale; break;
        }
        
        this.x += this.dx;
        this.y += this.dy;

        this.draw();
    }

    this.changeDirection = function(direct){
        switch(direct){
            case "Up":
                if(this.dy === 0){
                    direction = "Up";
                } 
                break;
            case "Down":
                if(this.dy === 0){
                    direction = "Down";
                } 
                break;
            case "Left":
                if(this.dx === 0){
                    direction = "Left";
                } 
                break;
            case "Right":
                if(this.dx === 0){
                    direction = "Right";
                } 
                break;
        }
    }
}