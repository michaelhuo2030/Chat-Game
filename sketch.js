var socket;
 
var current = {

};

function setup() {
   //createCanvas(windowWidth, windowHeight);
    createCanvas(500, 300);

    // start socket connection to server
    socket = io.connect("http://localhost:8080");
    socket.on("drawing",(data)=>{
        console.log("Got: " + 
        data.x0 + 
        " "+ 
        data.y0 + 
        " "+ 
        data.x1 + 
        " "+ 
        data.y1);

        line(data.x0 * width,data.y0 * height,data.x1 * width,data.y1 * height)
    })


  }
  
  
function draw() {
}

function drawline(x0,y0,x1,y1){
    line(x0,y0,x1,y1);

    //sending to server
    console.log("sendingmouse: " + x0 + " "+ y0 + " "+ x1 + " "+ y1);
    socket.emit("mouse",{
        x0: x0 / width,
        y0: y0 / height,
        x1: x1 / width,
        y1: y1 / height,
    })
}

function mousePressed() {
    if (mouseButton === LEFT){
        current.x = mouseX;
        current.y = mouseY;
    }
}

function mouseDragged() {
    if (mouseButton === LEFT){
        drawline(current.x, current.y, mouseX, mouseY);
        current.x = mouseX;
        current.y = mouseY;
    }

}