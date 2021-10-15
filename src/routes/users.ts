import express, { Request, Response, NextFunction } from "express";
var router = express.Router();
import createError from "http-errors";
import { User } from "../model";
import statusCode from "http-status-codes";
router.get("/", async function (req: Request, res: Response, next: NextFunction) {
  try {
    // 支持任何条件的查询语句，可以用来查询全列表信息，数据是否存在等
    let users = await User.findAll({
      where: req.query,
    });
    res.json(users);
  } catch (error: any) {
    next(createError(statusCode.INTERNAL_SERVER_ERROR, error));
  }
});
router.get("/:id", async function (req: Request, res: Response, next: NextFunction) {
  try {
    let user = await User.findByPk(req.params.id);
    if (!user) {
      res.json({
        success: false,
        msg: "用户id不存在",
      });
    } else {
      res.json({
        success: true,
        data: user,
      });
    }
  } catch (error: any) {
    next(createError(statusCode.INTERNAL_SERVER_ERROR, error));
  }
});
router.post("/", async function (req: Request, res: Response, next: NextFunction) {
  try {
    let user = req.body;
    const existed = await User.findOne({
      where: {
        username: user.username,
      },
    });
    if (existed) {
      res.json({ success: false, msg: "用户名已占用" });
    } else {
      user = await User.create(user);
      res.status(201).json({
        success: true,
        data: user,
      });
    }
  } catch (error: any) {
    next(createError(statusCode.INTERNAL_SERVER_ERROR, error));
  }
});
router.put("/:id", async function (req: Request, res: Response, next: NextFunction) {
  try {
    let id = req.params.id;
    let update = req.body;
    let user = await User.findByPk(id);
    if (!user) {
      res.json({
        success: false,
        msg: "用户id不存在",
      });
    } else {
      // 如果update的字段有误，那么就不会更新数据，不会出现异常
      user = await user.update(update);
      res.json({
        success: true,
        data: user,
      });
    }
  } catch (error: any) {
    next(createError(statusCode.INTERNAL_SERVER_ERROR, error));
  }
});
router.delete("/:id", async function (req: Request, res: Response, next: NextFunction) {
  try {
    // 不需要验证是否存在，直接删除
    const rows = await User.destroy({
      where: {
        id: req.params.id,
      },
    });
    // 通知客户端删除记录的条数，客户端判断删除操作是否成功
    res.json(rows);
  } catch (error: any) {
    next(createError(statusCode.INTERNAL_SERVER_ERROR, error));
  }
});

export default router;
