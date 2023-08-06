import * as express from "express";
import { Cat, CatType } from "./app.model";

const app: express.Express = express();

//* logging middleware
app.use((req, res, next) => {
  console.log(req.rawHeaders[1]);
  console.log("this is middleware");
  next();
});

//* json middleware
app.use(express.json());

//* READ 고양이 전체 데이터 다 조회
app.get("/cats", (req, res) => {
  try {
    const cats = Cat;
    // throw new Error("DB Connect");
    res.status(200).send({
      success: true,
      data: {
        cats,
      },
    });
  } catch (err: any) {
    res.status(400).send({
      success: false,
      error: err.message,
    });
  }
});

//* READ 특정 고양이 데이터 조회
app.get("/cats/:id", (req, res) => {
  try {
    const params = req.params;
    console.log(params.id);
    const cat = Cat.find((cat) => {
      return cat.id === params.id;
    });
    if (!cat) {
      throw new Error("No Cat");
    }
    res.status(200).send({
      success: true,
      data: {
        cat,
      },
    });
  } catch (err: any) {
    res.status(400).send({
      success: false,
      error: err.message,
    });
  }
});

//* CREATE 새로운 고양이 추가 API
app.post("/cats", (req, res) => {
  try {
    const data = req.body;
    console.log(data);
    Cat.push(data); //Create
    res.status(200).send({
      success: true,
      data: { data },
    });
  } catch (err: any) {
    res.status(400).send({
      success: false,
      error: err.message,
    });
  }
});

//* 404 middleware
app.use((req, res, next) => {
  console.log(req.rawHeaders[1]);
  console.log("this is error middleware");
  res.send({ error: "404 not found error" });
});
app.listen(8000, () => {
  console.log("Server is On...");
});
