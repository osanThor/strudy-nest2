import * as express from "express";

const app: express.Express = express();
const port: number = 8000;

app.get("/", (req: express.Request, res: express.Response) => {
  console.log(req);
  res.send({ name: "Jun Young", age: 10, word: "Hello World!" });
});

app.get("/test", (req: express.Request, res: express.Response) => {
  console.log(req);
  res.send("HaHa");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}/`);
});
