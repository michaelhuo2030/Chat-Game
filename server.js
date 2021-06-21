// Http

const http = require("http");
const url = require("url");
const path = require("path");

const fs = require("fs");

const server = http.createServer(handleRequest);
// server.listen(8080);
const port = process.env.PORT || 8080;
server.listen(port , () =>{
    console.log('server running...');
});

// console.log("server started on port 8080");

function handleRequest(req, res) {
    let pathname = req.url;

    if(pathname == "/") {
        pathname = "/index.html";
    }

    let ext = path.extname(pathname);

    //Map extension to file type
    let typeExt = {
        ".html": "text/html",
        ".js": "text/javascript",
        ".css": "text/css"
    }

    let contentType = typeExt[ext] || "text/plain";

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

const io = require("socket.io")(server);

io.sockets.on("connection", (socket) => {
    console.log("we have a new client: " + socket.id);

    socket.on("disconnect", () => {
        console.log("client disconnected")
    })
})



