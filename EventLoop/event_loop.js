const fs = require("fs");
const crypto = require("crypto");

process.env.UV_THREADPOOL_SIZE = 4;

const start = Date.now();
setTimeout(() => console.log("Event Timer 1 finished"), 0);
setImmediate(() => console.log("Immediate 1 finished"));

fs.readFile("test-file.txt", "utf8", (err, data) => {
  if (err) throw err;
  console.log("I/O finished");
  setTimeout(() => console.log("Event Timer 2 finished"), 0);
  setTimeout(() => console.log("Event Timer 3 finished"), 3000);
  setImmediate(() => console.log("Immediate 2 finished"));

  process.nextTick(() => console.log("process.nextTick finished"));

  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "Password Encrypted");
  });
  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "Password Encrypted");
  });
  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "Password Encrypted");
  });
  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "Password Encrypted");
  });
});

console.log("Hello from te top level code");
