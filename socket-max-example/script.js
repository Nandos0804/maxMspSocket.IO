const path = require("path");
const Max = require("max-api");
const io = require("socket.io-client");
const ioClient = io.connect("ws://localhost:8000");

ioClient.on("seq-num", (msg) => {
	Max.outlet(msg);
	Max.post(msg);
});

Max.addHandler ('sendMessage',(mess) =>{
	ioClient.emit("sendMessage", mess);
});

Max.addHandler ('triggerTone',(mess) =>{
	ioClient.emit("triggerTone", mess);
});