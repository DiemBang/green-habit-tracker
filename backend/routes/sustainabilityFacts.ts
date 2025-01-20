import { Router, Request, Response } from "express";
import { ISustainabilityFact } from "../models/ISustainabilityFact.js";
import express from "express";

const router = Router();

/* GET sustainability facts */
router.get("/", function (req: Request, res: Response) {
  // HÄMTA (anropa databas connection som skapades i app.js )
  req.app.locals.db
    .collection("SustainabilityFact")
    .find()
    .toArray()
    .then((results: Array<ISustainabilityFact>) => {
      res.json(results);
    });
});

export default router;
