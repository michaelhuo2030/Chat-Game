var socket;
// import { io } from "socket.io-client";
//const io = require('socket.io-client');
//var io = require("socket.io-client");
var current = {
    color: "#34495e",
    weight: 1,

};
var pg;

var weightSlider = document.getElementById("weight-slider");
weightSlider.addEventListener("change", changeWeight, false);

//var colorPicker = document.getElementById("color-picker");
//colorPicker.addEventListener("change", changeColor, false);

function changeWeight(e) {
    current.weight = e.target.value;
}

function changeColor(color){
    current.color = `#${color}`;
}

function setup() {
   //createCanvas(windowWidth, windowHeight);
    createCanvas(windowWidth, 400);
  //  pg = createGraphics(500,300);
    //pg.background(255); //255 white; 0 black

    // start socket connection to server
    //socket = io.connect("http://localhost:8080");
    //socket = io.connect("https://polar-castle-70643.herokuapp.com/")({'timeout':5000, 'connect timeout':5000});
    //socket = io.connect("https://polar-castle-70643.herokuapp.com/");
    //socket = io("http://localhost:8080");
    socket = io();
    //check for connections

    if(socket !== undefined){
        console.log('connected to socket');
    }


    socket.on("drawing",(data)=>{
        console.log("Got: " + 
        data.x0 + 
        " "+ 
        data.y0 + 
        " "+ 
        data.x1 + 
        " "+ 
        data.y1);

      //  pg.line(data.x0 * width,data.y0 * height,data.x1 * width,data.y1 * height)
        stroke(data.color);
        strokeWeight(data.weight);
        line(data.x0 * width,data.y0 * height,data.x1 * width,data.y1 * height)


    })


  }
  
  
function draw() {
  //  image(pg,0,20 );
}

function drawline(x0,y0,x1,y1){
    stroke(current.color);
    strokeWeight(current.weight);
    line(x0,y0,x1,y1);


    //sending to server
    console.log("sendingmouse: " + x0 + " "+ y0 + " "+ x1 + " "+ y1);
    socket.emit("mouse",{
        x0: x0 / width,
        y0: y0 / height,
        x1: x1 / width,
        y1: y1 / height,
        color: current.color,
        weight: current.weight,
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


function touchStarted() {

    current.x = mouseX;
    current.y = mouseY;

}

function touchMoved() {

    drawline(current.x, current.y, mouseX, mouseY);
    current.x = mouseX;
    current.y = mouseY;

}