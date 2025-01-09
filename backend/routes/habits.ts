import { Router, Request, Response } from "express";
import { IHabit } from "../models/IHabit";

var express = require("express");
const router = Router();

/* GET habitTypes */
router.get("/", function (req: Request, res: Response) {
  let category = req.query.category;
  console.log("category", category);

  let query = category ? { Category: category } : {};

  req.app.locals.db
    .collection("Habit")
    .find(query)
    .toArray()
    .then((results: Array<IHabit>) => {
      console.log("results", results);
      res.json(results);
    });
});

/* GET specific habitTypes */
router.post("/", function (req: Request, res: Response) {
  let identifier = req.body.identifier;
  console.log("identifier", identifier);

  let query = identifier ? { Identifier: identifier } : {};

  req.app.locals.db
    .collection("Habit")
    .findOne(query)
    .then((results: IHabit) => {
      console.log("results", results);
      res.json(results);
    });
});

export default router;
