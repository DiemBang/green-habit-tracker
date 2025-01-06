import { Router, Request, Response } from "express";
import { IHabitType } from "../models/IHabitType";

var express = require("express");
const router = Router();

/* GET habitTypes */
router.get("/", function (req: Request, res: Response) {
  // HÄMTA (anropa databas connection som skapades i app.js )
  req.app.locals.db
    .collection("HabitType")
    .find()
    .toArray()
    .then((results: Array<IHabitType>) => {
      console.log(results);
      res.json(results);
    });
});

export default router;
