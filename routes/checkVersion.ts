import express, { Request, Response } from 'express';
import { versions } from '../modules/versions';

const router = express.Router();

router.post('/checkversion', async (req: Request, api: Response) => {
  try {
    const { version } = req.body;

    api.send({
      ...versions[version],
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
