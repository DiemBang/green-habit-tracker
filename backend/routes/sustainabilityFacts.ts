import { Router, Request, Response } from "express";
import { ISustainabilityFacts } from "../models/ISustainabilityFacts";

var express = require("express");
const router = Router();

/* GET sustainability facts */
router.get("/", function (req: Request, res: Response) {
  // HÄMTA (anropa databas connection som skapades i app.js )
  req.app.locals.db
    .collection("SustainabilityFact")
    .find()
    .toArray()
    .then((results: Array<ISustainabilityFacts>) => {
      console.log("results", results);
      res.json(results);
    });
});

export default router;
