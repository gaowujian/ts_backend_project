import createError from "http-errors";
import express, { Request, Response, NextFunction } from "express";
import logger from "morgan";
import indexRouter from "./routes/index";
import usersRouter from "./routes/users";
import statusCode from "http-status-codes";

var app = express();
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", indexRouter);
app.use("/users", usersRouter);

app.use(function (_req, _res, next) {
  next(createError(404));
});

app.use(function (error: any, _req: Request, res: Response, _next: NextFunction) {
  res.status(error.status || statusCode.INTERNAL_SERVER_ERROR);
  res.json({
    success: false,
    error,
  });
});

export default app;
