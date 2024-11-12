import WebSocket , { WebSocketServer } from "ws";
import http from 'http'

const server = http.createServer(function (req :  any , res : any){
    console.log(Date.now() + 'request from url : ' , req.url)
    res.end("hi there")
})

const wss = new WebSocketServer({server});

wss.on('connection', function connection (socket){
    socket.on('error', console.error);

    socket.on('message', function message(data : any,isBinary){
    wss.clients.forEach(function each(client){
    if (client.readyState === WebSocket.OPEN){
    client.send(data,{binary : isBinary});
    }})})
    socket. send('hello message from server')
}
)

server.listen(8000,function(){
    console.log("server is listening on 8000")
})