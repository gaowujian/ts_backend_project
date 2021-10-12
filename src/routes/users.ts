import express, { Request, Response } from "express";
var router = express.Router();

router.get("/", function (_req: Request, res: Response) {
  res.json({
    success: true,
    data: "users",
  });
});

export default router;
