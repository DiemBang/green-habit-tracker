import { Router, Request, Response } from "express";
import { IChallenge } from "../models/IChallenge";

var express = require("express");
const router = Router();

/* GET ecotips */
router.get("/", function (req: Request, res: Response) {
  // HÄMTA (anropa databas connection som skapades i app.js )
  req.app.locals.db
    .collection("Challenge")
    .find()
    .toArray()
    .then((results: Array<IChallenge>) => {
      console.log("results", results);
      res.json(results);
    });
});

export default router;
