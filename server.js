// Http

var http = require("http");
var url = require("url");
var path = require("path");

var fs = require("fs");

var server = http.createServer(handleRequest);
// server.listen(8080);
var port = process.env.PORT || 8080;
server.listen(port , () =>{
    console.log('server running...');
});

// console.log("server started on port 8080");

function handleRequest(req, res) {
    var pathname = req.url;

    if(pathname == "/") {
        pathname = "/index.html";
    }

    var ext = path.extname(pathname);

    //Map extension to file type
    var typeExt = {
        ".html": "text/html",
        ".js": "text/javascript",
        ".css": "text/css"
    }

    var contentType = typeExt[ext] || "text/plain";

    fs.readFile(__dirname + pathname, (err, data) => {
        if (err) {
            res.writeHead(500);
            return res.end("Error loading" + pathname);
        }

        // otherwise, send data back
        res.writeHead(200,{"content-Type": contentType});
        res.end(data);
    })
}


// WebSocket

var io = require("socket.io").listen(server);

io.sockets.on("connection", (socket) => {
    console.log("we have a new client: " + socket.id);

    //when user emits
    socket.on("mouse", (data)=>{
        //send to all other
        socket.broadcast.emit("drawing", data);
        console.log("received: 'mouse' " + 
            data.x0 + 
            " "+ 
            data.y0 + 
            " "+ 
            data.x1 + 
            " "+ 
            data.y1);

    })

    socket.on("disconnect", () => {
        console.log("client disconnected");
    })
})



