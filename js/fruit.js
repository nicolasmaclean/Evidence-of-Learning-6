function Fruit(){
    this.x;
    this.y;

    this.pickLocation = function(){
        do{
            this.x = Math.floor(1+Math.random()*columns)*scale;
            this.y = Math.floor(1+Math.random()*rows)*scale;
        } while(inSnake())
    }

    this.draw = function(){
        c.fillStyle = "red";
        c.fillRect(this.x+1, this.y+1, scale-2, scale-2)
    }
}

function inSnake(){
    for(let i = 0; i < snake.tail.length; i++){
        if(this.x === snake.tail[i].x && this.y === snake.tail[i].y)
            return true;
    }
    return false;
}