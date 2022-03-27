import express, { Request, Response } from "express";
import axios from "axios";
const fs = require("fs");
const file = fs.readFileSync("moderate.jpg");

const router = express.Router();

router.post("/checkimage", async (req: Request, api: Response) => {
  const encoded = Buffer.from(file).toString("base64");

  try {
    const { imageEncoded } = req.body;
    if (imageEncoded) {
      const { data: authData } = await axios.post(
        "https://iam.api.cloud.yandex.net/iam/v1/tokens",
        {
          yandexPassportOauthToken: "AQAAAAATivr3AATuwYNUc_fBjEyxvOcamRhQ5ss",
        }
      );

      const { data } = await axios.post(
        "https://vision.api.cloud.yandex.net/vision/v1/batchAnalyze",
        {
          folderId: "b1g4be97mmeq1hch19vg",
          analyze_specs: [
            {
              content: imageEncoded,
              features: [
                {
                  type: "CLASSIFICATION",
                  classificationConfig: {
                    model: "moderation",
                  },
                },
              ],
            },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authData.iamToken}`,
          },
        }
      );

      api.send({
        data,
        success: true,
      });
    }
  } catch (err) {
    console.error(err);
    api.send({
      success: false,
    });
  }
});

export default router;
