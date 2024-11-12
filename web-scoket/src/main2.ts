import WebSocket , {WebSocketServer} from "ws";
import express from 'express'

const app = express();
const httpServer = app.listen(8080,()=>{
    console.log("hello world")
});

const wss = new WebSocketServer({server : httpServer})

wss.on('connection',function(socket){
    socket.on('error',console.error)

    socket.on('message',function(data,isBinary){
        wss.clients.forEach(function(client){
            if(client.readyState === WebSocket.OPEN){
                client.send(data,{binary : isBinary})
            }
        })
    })
    socket.send("kem cho")
})

