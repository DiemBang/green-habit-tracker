import { Router, Request, Response } from "express";

var express = require("express");
const router = Router();

/* GET habitTypes */
router.get("/", function (req: Request, res: Response) {
  // HÄMTA (anropa databas connection som skapades i app.js )
  req.app.locals.db
    .collection("HabitType")
    .find()
    .toArray()
    .then((results: Array<any>) => {
      // To-do: create Interface and add type to results
      console.log(results);
      res.json(results);
    });
});

export default router;
