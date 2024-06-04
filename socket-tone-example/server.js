// websocket
const { Server } = require("socket.io");
// per creare il sito
const express = require("express");
const { createServer } = require("node:http");
const { join } = require("node:path");

// frontend
const app = express();
const httpServer = createServer(app);

// backend
const server = new Server(8000);

// pagina
app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "index.html"));
});

// check pagina e apertura porta
httpServer.listen(3000, () => {
  console.log("server running at http://localhost:3000");
});

// unisco i due server
server.attach(httpServer);

// init numeri sequenziali per client
let sequenceNumberByClient = new Map();

// quando si collega un client
server.on("connection", (socket) => {
  console.info(`Client connected [id=${socket.id}]`);
  // initialize this client's sequence number
  sequenceNumberByClient.set(socket, 1);

  // quando si scollega un client, eliminalo
  socket.on("disconnect", () => {
    sequenceNumberByClient.delete(socket);
    console.info(`Client gone [id=${socket.id}]`);
  });

  // da max quando ricevo messaggio lo giro ad ogni client
  // tutto generico, va sistemato ma rimane proof of concept
  socket.on("sendMessage", (arg) => {
    const messageArray = String(arg).split(/[\\s-]+/);
    console.log(messageArray[0]);
    console.log(messageArray[1]);
    // [0]controll message [1 controll value]
    for (const [client] of sequenceNumberByClient.entries()) {
      client.emit(messageArray[0], messageArray[1]);
    }
  });
});

// manda ad ogni client un counter diverso
setInterval(() => {
  for (const [client, sequenceNumber] of sequenceNumberByClient.entries()) {
    client.emit("seq-num", sequenceNumber);
    sequenceNumberByClient.set(client, sequenceNumber + 1);
  }
}, 1000);
