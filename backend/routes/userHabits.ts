import { Router, Request, Response } from "express";
import { IUserHabit } from "../models/IUserHabit";

var express = require("express");
const router = Router();

/* GET userHabits */
router.get("/", function (req: Request, res: Response) {
  // HÄMTA (anropa databas connection som skapades i app.js )
  req.app.locals.db
    .collection("UserHabit")
    .find()
    .toArray()
    .then((results: Array<IUserHabit>) => {
      console.log("results", results);
      res.json(results);
    });
});

export default router;
