import express, { Request, Response } from "express";

const router = express.Router();

router.post("/checkversion", async (req: Request, api: Response) => {
  try {
    const { version } = req.body;

    api.send({
      isAllowed: true,
      isActual: false,
      title: "Доступна новая версия",
      description: "Бла-бла-бла",
      success: true,
    });
  } catch (err) {
    console.error(err);
    api.send({
      success: false,
    });
  }
});

export default router;
