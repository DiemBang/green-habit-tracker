import { Router, Request, Response } from "express";
import { IChallenge } from "../models/IChallenge";

var express = require("express");
const router = Router();

/* GET challenges */
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

/* GET challenges for specific month */
router.get("/current", async (req: Request, res: Response): Promise<any> => {
  const currentMonth = new Date().getMonth() + 1;

  req.app.locals.db
    .collection("Challenge") // Specify the type for the collection
    .find({ monthAvailableToJoin: currentMonth })
    .toArray()
    .then((results: IChallenge[]) => {
      if (results.length === 0) {
        // Handle case where no challenge is found
        return res.status(404).json({ error: "Challenge not found." });
      }
      console.log("results", results);
      res.json(results);
    });
});

export default router;
