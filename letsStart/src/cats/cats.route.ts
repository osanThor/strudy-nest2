import { Cat } from "./cats.model";
import { Router } from "express";

const router = Router();

//* READ 고양이 전체 데이터 다 조회 --> GET
router.get("/cats", (req, res) => {
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

//* READ 특정 고양이 데이터 조회 --> GET
router.get("/cats/:id", (req, res) => {
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

//* CREATE 새로운 고양이 추가 API --> POST
router.post("/cats", (req, res) => {
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

//* UPDATE 고양이 데이터 수정 --> PUT
router.put("/cats/:id", (req, res) => {
  try {
    const params = req.params;
    const body = req.body;
    let result;
    Cat.forEach((cat) => {
      if (cat.id === params.id) {
        cat = body;
        result = cat;
      }
    });

    res.status(200).send({
      success: true,
      data: {
        cat: result,
      },
    });
  } catch (err: any) {
    res.status(400).send({
      success: false,
      error: err.message,
    });
  }
});

//*UPDATE 고양이 데이터 부분적 수정 --> PUT
router.put("/cats/:id", (req, res) => {
  try {
    const params = req.params;
    const body = req.body;
    let result;
    Cat.forEach((cat) => {
      if (cat.id === params.id) {
        cat = { ...cat, ...body };
        result = cat;
      }
    });

    res.status(200).send({
      success: true,
      data: {
        cat: result,
      },
    });
  } catch (err: any) {
    res.status(400).send({
      success: false,
      error: err.message,
    });
  }
});

//*DELETE 고양이 삭제
router.delete("/cats/:id", (req, res) => {
  try {
    const params = req.params;
    const newCat = Cat.filter((cat) => cat.id !== params.id);

    res.status(200).send({
      success: true,
      data: {
        cat: newCat,
      },
    });
  } catch (err: any) {
    res.status(400).send({
      success: false,
      error: err.message,
    });
  }
});

export default router;
