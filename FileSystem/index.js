const fs = require("fs");
const http = require("http");
const url = require("url");
const slugfify = require("slugify");
const replaceTemplate = require("./modules/replace_templates");

// const data = fs.readFileSync("trial.txt", "utf-8");
// console.log(data);
// console.log("Hello I am Jinal");

// fs.readFile("trial.txt", "utf-8", (err, data) => {
//   console.log(data);
// });

// fs.writeFile("data.txt", `Output Data: ${data}`, (err) => {
//   if (err) {
//     console.log("Error");
//   }
// });

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);

const slugs = dataObj.map((ele) => slugfify(ele.productName, { lower: true }));
console.log(slugs);

const templateOverview = fs.readFileSync(
  `${__dirname}/templates/template_overview.html`,
  "utf-8"
);
const templateCard = fs.readFileSync(
  `${__dirname}/templates/template_card.html`,
  "utf-8"
);
const templateProduct = fs.readFileSync(
  `${__dirname}/templates/template_product.html`,
  "utf-8"
);

const server = http.createServer((req, res) => {
  // const pathName = req.url;
  const { query, pathname } = url.parse(req.url, true);

  //   Overviewp page
  if (pathname === "/" || pathname === "/overview") {
    // res.end("This is the OVERVIEW");
    res.writeHead(200, {
      "Content-type": "text/html",
    });

    const cardsHtml = dataObj
      .map((ele) => replaceTemplate(templateCard, ele))
      .join("");
    const output = templateOverview.replace(/{%PRODUCT_CARDS%}/g, cardsHtml);
    res.end(output);
  }
  //   Product page
  else if (pathname === "/product") {
    const product = dataObj[query.id];
    const output = replaceTemplate(templateProduct, product);
    res.end(output);
    // res.end("This is the PRODUCT");
  }
  //   API
  else if (pathname === "/api") {
    res.writeHead(200, {
      "Content-type": "application/json",
    });
    res.end(data);
  }
  //   Page not found page
  else {
    res.writeHead(404, {
      "Content-Type": "text/html",
      "own-header": "Helllo World",
    });
    res.end("<h1>Page Not Found</h1>");
  }
  // res.end("Hello from the server");
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listning on the port 8000");
});
