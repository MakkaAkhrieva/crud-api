import http from "http";
import url from "url";
import { handleRequest } from "./routes";

const server = http.createServer(async (req, res) => {
  const { pathname, query } = url.parse(req.url, true);

  const result = await handleRequest(req.method, pathname, query, req);

  res.statusCode = result.statusCode;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(result.body));
});

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
