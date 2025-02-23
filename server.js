const { createServer } = require("http");
const express = require("express");
const { parse } = require("url");
const next = require("next");

const port = parseInt(process.env.PORT || "3000", 10);
const hostname = "localhost" || "127.0.0.1";
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const expressApp = express();

  expressApp.use("/images", express.static(process.env.PHOTOS_PATH));

  expressApp.all("*", (req, res) => {
    return handle(req, res);
  });

  createServer(expressApp).listen(port, (err) => {
    if (err) throw err;
    console.log(
      `> Ready on http://${hostname}:${port} as ${
        dev ? "development" : process.env.NODE_ENV
      }`,
    );
  });
});
