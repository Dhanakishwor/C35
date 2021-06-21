var edgeball;
var database,position;


function setup(){
    createCanvas(500,500);
    database=firebase.database();
    edgeball = createSprite(250,250,10,10);
    edgeball.shapeColor = "red";
    var edgeballPosition=database.ref("ball/position");
    edgeballPosition.on("value",readPosition,showError);
}

function draw(){
    background("white");
    if (position!=null){
        if(keyDown(LEFT_ARROW)){
            writePosition(-1,0);
        }
        else if(keyDown(RIGHT_ARROW)){
            writePosition(1,0);
        }
        else if(keyDown(UP_ARROW)){
            writePosition(0,-1);
        }
        else if(keyDown(DOWN_ARROW)){
            writePosition(0,+1);
        }
        drawSprites();
    }

    
    
}

function writePosition(x,y){
    database.ref("ball/position").set({
        'x': position.x + x,
        'y':position.y + y
    });
}
function readPosition(data){
    position=data.val();
    edgeball.x=position.x;
    edgeball.y=position.y;
}
function showError(){
    console.log("error in reading to database");
    
}