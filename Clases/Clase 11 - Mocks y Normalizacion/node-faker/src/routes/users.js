import express from "express";
import { UserMock } from "../mocks/userMock.js";

const userRouter = express.Router();

const usersApi = new UserMock();

userRouter.post("/generar", (req, res) => {
  let { cant } = req.query;
  let results = usersApi.populate(parseInt(cant));
  res.send(results);
});

userRouter.get("/", (req, res) => {
  let users = usersApi.getAll();
  res.send(users);
});

export { userRouter };
