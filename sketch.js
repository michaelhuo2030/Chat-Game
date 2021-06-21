var socket;
 
var current = {

};

function setup() {
   //createCanvas(windowWidth, windowHeight);
   createCanvas(500, 300);
  }
  
  
function draw() {
}


function mousePressed() {
    if (mouseButton === LEFT){
        current.x = mouseX;
        current.y = mouseY;
    }
}

function mouseDragged() {
    line(current.x, current.y, mouseX, mouseY);
    current.x = mouseX;
    current.y = mouseY;

}