import { Router, Request, Response } from "express";
import { IUserChallenge } from "../models/IUserChallenge";

var express = require("express");
const router = Router();

/* GET userHabits */
router.get("/", function (req: Request, res: Response) {
  // HÄMTA (anropa databas connection som skapades i app.js )
  req.app.locals.db
    .collection("UserChallenge")
    .find()
    .toArray()
    .then((results: Array<IUserChallenge>) => {
      console.log("results", results);
      res.json(results);
    });
});

export default router;
