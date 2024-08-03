import { readFileSync } from "fs";
import http from "http";
import mime from "mime";

const port = process.env.PORT || 3000;

http
  .createServer((req, res) => {
    const path = req.url;
    console.log(`Request received for '${path}'`);

    let pathWithoutBasePath = path?.replace("/email-signature-generator", "");
    if (!pathWithoutBasePath) {
      pathWithoutBasePath = "/index.html";
    }

    const filePath = __dirname + "/out" + pathWithoutBasePath;

    try {
      const data = readFileSync(filePath);

      res.writeHead(200, { "Content-Type": mime.getType(filePath)! });
      res.end(data);
    } catch (error) {
      res.writeHead(404);
      res.end(JSON.stringify(error));
    }
  })
  .listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
