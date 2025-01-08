import { Router, Request, Response } from "express";
import { IUser } from "../models/IUser";
import { IEcotips } from "../models/IEcotips";

var express = require("express");
const router = Router();

/* GET ecotips */
router.get("/", function (req: Request, res: Response) {
  // HÄMTA (anropa databas connection som skapades i app.js )
  req.app.locals.db
    .collection("Ecotip")
    .find()
    .toArray()
    .then((results: Array<IEcotips>) => {
      console.log("results", results);
      res.json(results);
    });
});

export default router;
