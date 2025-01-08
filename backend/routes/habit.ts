import { Router, Request, Response } from "express";
import { IHabit } from "../models/IHabit";

var express = require("express");
const router = Router();

/* GET habitTypes */
router.get("/", function (req: Request, res: Response) {
  let category = req.query.category;
  console.log("category", category);

  let query = category ? { Category: category } : {};
  // HÄMTA (anropa databas connection som skapades i app.js )
  req.app.locals.db
    .collection("Habit")
    .find(query)
    .toArray()
    .then((results: Array<IHabit>) => {
      console.log("results", results);
      res.json(results);
    });
});

export default router;
