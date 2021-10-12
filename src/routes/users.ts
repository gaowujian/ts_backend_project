import express, { Request, Response, NextFunction } from "express";
var router = express.Router();
import createError from "http-errors";
import { User } from "../model";
import statusCode from "http-status-codes";
router.get("/", async function (_req: Request, res: Response, next: NextFunction) {
  try {
    let users = await User.findAll();
    res.json({
      success: true,
      data: users,
    });
  } catch (error) {
    next(createError(statusCode.INTERNAL_SERVER_ERROR));
  }
});
router.get("/:id", async function (req: Request, res: Response, next: NextFunction) {
  try {
    let user = await User.findByPk(req.params.id);
    if (!user) {
      return next(createError(statusCode.INTERNAL_SERVER_ERROR));
    }
    res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(createError(statusCode.INTERNAL_SERVER_ERROR));
  }
});
router.post("/", async function (req: Request, res: Response, next: NextFunction) {
  try {
    let user = req.body;
    user = await User.create(user);
    res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(createError(statusCode.INTERNAL_SERVER_ERROR));
  }
});
router.put("/:id", async function (req: Request, res: Response, next: NextFunction) {
  try {
    let id = req.params.id;
    let update = req.body;
    let user = await User.findByPk(id);
    if (!user) {
      return next(createError(statusCode.INTERNAL_SERVER_ERROR));
    }
    user = await user.update(update);
    res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(createError(statusCode.INTERNAL_SERVER_ERROR));
  }
});
router.delete("/:id", async function (req: Request, res: Response, next: NextFunction) {
  try {
    let id = req.params.id;
    let user = await User.findByPk(id);
    if (!user) {
      return next(createError(statusCode.INTERNAL_SERVER_ERROR));
    }
    await user.destroy();
    res.json({
      success: true,
      // data: user,
    });
  } catch (error) {
    next(createError(statusCode.INTERNAL_SERVER_ERROR));
  }
});

export default router;
