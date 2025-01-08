import { Router, Request, Response } from "express";
import { IUserHabitCompleted } from "../models/IUserHabitCompleted";

var express = require("express");
const router = Router();

/* GET ecotips */
router.get("/", function (req: Request, res: Response) {
  // HÄMTA (anropa databas connection som skapades i app.js )
  req.app.locals.db
    .collection("UserHabitCompleted")
    .find()
    .toArray()
    .then((results: Array<IUserHabitCompleted>) => {
      console.log("results", results);
      res.json(results);
    });
});

export default router;
