function init(){
    canvas = document.getElementById('mycanvas');
    pen = canvas.getContext('2d');
    W = canvas.width;
    H = canvas.height;
    game_over=false;
    score = 0;
    colors=["green","blue","gray","orange","pink","magenta","black","white"]
    snake = {
        init_length:5,
        color:"orange",
        cells:[],
        direction:"right",
        createSnake:function(){
            for(var i=this.init_length-1;i>=0;i--){
                this.cells.push({x:i,y:0})
            }///console.log("creat snake ");
        },
        drawSnake:function(){
                for(var i=0;i<this.cells.length;i++){
                    pen.fillStyle=this.color;
                   
                    pen.strokeStyle="white";
                    pen.lineWidth=5;
                     pen.strokeRect(this.cells[i].x*20,this.cells[i].y*20,20,20);
                    pen.fillRect(this.cells[i].x*20,this.cells[i].y*20,20,20); 
                }///console.log("draw snake ");
         },
        updateSnake:function(){
                 var headX=this.cells[0].x;
                 var headY=this.cells[0].y;
                
                if(headX==food.x && headY==food.y){
                    food=getRandomFood();
                    score++;
                }
              else{
                  this.cells.pop();
              }
    
                if(this.direction=="right"){
                      nextX=headX+1;
                      nextY=headY;
                }
                else if(this.direction=="left"){
                      nextX=headX-1;
                      nextY=headY;
                }
                else if(this.direction=="down"){
                      nextX=headX;
                      nextY=headY+1;
                }
               else if(this.direction=="up"){
                      nextX=headX;
                      nextY=headY-1;
                }
                  
              //pop the last cell from tail
                   // this.cells.pop();
            
                //insert new cell at the head;
                 this.cells.unshift({x:nextX,y:nextY});
              
               var x_cells = Math.round(W/20);
               var y_cells = Math.round(H/20);
            
               if(this.cells[0].x<-1 || this.cells[0].x>x_cells ||this.cells[0].y<-1 || this.cells[0].y>y_cells){
                  /* //alert("game over");
                   */
                   alert("game over");
                   game_over=true;
                   
                   
                  /* x=confirm("play again");
                   if(x==true){
                       startgame();
                       //game_over=true;
                       //f=setInterval(gameloop,200)
                   }
                   else{
                       game_over=true;
                   }
                   */
                   
               }
        }
    }
    snake.createSnake();
    
    food=getRandomFood();
    
    function KeyPressed(e){
        console.log("you pressed a key");
        
        if(e.key=="ArrowRight"){
            snake.direction="right";
        }
        else if(e.key=="ArrowLeft"){
            snake.direction="left";
        }
        else if(e.key=="ArrowDown"){
            snake.direction="down";
        }
        else if(e.key=="ArrowUp"){
            snake.direction="up";
        }
    }
    document.addEventListener('keydown',KeyPressed);
}

function draw(){
    pen.clearRect(0,0,W,H);
    snake.drawSnake();
    
    var i = Math.round(Math.random()*colors.length);
    pen.fillStyle=colors[i];
    pen.fillRect(food.x*20,food.y*20,20,20);
    
    pen.fillStyle="red";
    pen.font="24px Arial";
    pen.fillText("Score :"+score,10,20);
}

function update(){
    snake.updateSnake();
    console.log("in update");
    /*if(food.x==snake.cells[0].x&&food.y==snake.cells[0].y){
        food=getRandomFood();
    }
    */
    
}

function getRandomFood(){
    
    var foodX=Math.round(Math.random()*(W-20)/20);
    var foodY=Math.round(Math.random()*(H-20)/20);
    
    return{x:foodX,y:foodY};

}


function gameloop(){
    console.log("in game loop")
    draw();
    update();
    if(game_over==true){
    clearInterval(f);
}
}


function startgame(){
    init();
    f=setInterval(gameloop,200);
    //gameloop();
}

startgame();
/*function keypressed(someinfo){
    console.log("pressed a key");
    //console.log(someinfo);
    if(someinfo.key=="ArrowLeft"){
        console.log("moving left");
    }
}
document.addEventListener('keydown',keypressed)
*/
