import { Router, Request, Response } from "express";
import { IHabitType } from "../models/IHabitType";

var express = require("express");
const router = Router();

/* GET habitTypes */
router.get("/", function (req: Request, res: Response) {
  let category = req.query.category;
  console.log("category", category);

  let query = category ? { Category: category } : {};
  // HÄMTA (anropa databas connection som skapades i app.js )
  req.app.locals.db
    .collection("HabitType")
    .find(query)
    .toArray()
    .then((results: Array<IHabitType>) => {
      console.log("results", results);
      res.json(results);
    });
});

export default router;
