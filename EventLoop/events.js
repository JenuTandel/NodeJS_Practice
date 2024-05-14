const EventEmitter = require("events");
const http = require("http");

class Sales extends EventEmitter {
  constructor() {
    super();
  }
}
const eventEmitter = new Sales();

eventEmitter.on("newSale", () => {
  console.log("There were a new sale");
});

eventEmitter.on("newSale", () => {
  console.log("Customer name: Jinal");
});
eventEmitter.on("newSale", (stock) => {
  console.log(`There are now ${stock} items in the stock`);
});

eventEmitter.emit("newSale", 8);

const server = http.createServer();

server.on("request", (req, res) => {
  console.log("Request Receieved");
  res.end("Request received");
});
server.on("request", (req, res) => {
  console.log("Another Request received😊");
});
server.on("close", () => {
  console.log("Server closed");
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Waiting for requests...");
});
