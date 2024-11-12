"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const ws_2 = __importDefault(require("ws"));
const http_1 = __importDefault(require("http"));
const server = http_1.default.createServer(function (req, res) {
    console.log(Date.now() + 'request from url : ', req.url);
    res.end("hi there");
});
const wss = new ws_1.WebSocketServer({ server });
wss.on('connection', function connection(socket) {
    socket.on('error', console.error);
    socket.on('message', function message(data, isBinary) {
        wss.clients.forEach(function each(client) {
            if (client.readyState === ws_2.default.OPEN) {
                client.send(data, { binary: isBinary });
            }
        });
    });
    socket.send('hello message from server');
});
server.listen(8000, function () {
    console.log("server is listening on 8000");
});
