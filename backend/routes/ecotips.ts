import { Router, Request, Response } from "express";
import { IEcotip } from "../models/IEcotip";

var express = require("express");
const router = Router();

/* GET ecotips */
router.get("/", function (req: Request, res: Response) {
  // HÄMTA (anropa databas connection som skapades i app.js )
  req.app.locals.db
    .collection("Ecotip")
    .find()
    .toArray()
    .then((results: Array<IEcotip>) => {
      console.log("results", results);
      res.json(results);
    });
});

export default router;
