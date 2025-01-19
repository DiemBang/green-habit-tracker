import { Router, Request, Response } from "express";
import { IUserChallengeCompleted } from "../models/IUserChallengeCompleted.js";
import express from "express";

const router = Router();

/* GET ecotips */
router.get("/", function (req: Request, res: Response) {
  // HÄMTA (anropa databas connection som skapades i app.js )
  req.app.locals.db
    .collection("UserChallengeCompleted")
    .find()
    .toArray()
    .then((results: Array<IUserChallengeCompleted>) => {
      console.log("results", results);
      res.json(results);
    });
});

export default router;
