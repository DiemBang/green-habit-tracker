import { Router, Request, Response } from "express";
import { IHabit } from "../models/IHabit.js";
import express from "express";

const router = Router();

/* GET habitTypes */
router.get("/", function (req: Request, res: Response) {
  let category = req.query.category;

  let query = category ? { category: category } : {};

  req.app.locals.db
    .collection("Habit")
    .find(query)
    .toArray()
    .then((results: Array<IHabit>) => {
      res.json(results);
    });
});

/* GET specific habitType */
router.post("/", function (req: Request, res: Response) {
  let identifier = req.body.identifier;

  let query = identifier ? { identifier: identifier } : {};

  req.app.locals.db
    .collection("Habit")
    .findOne(query)
    .then((results: IHabit) => {
      res.json(results);
    });
});

export default router;
