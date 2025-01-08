import { Router, Request, Response } from "express";
import { IUser } from "../models/IUser";

var express = require("express");
const router = Router();

/* GET habitTypes */
router.get("/", function (req: Request, res: Response) {
  // HÄMTA (anropa databas connection som skapades i app.js )
  req.app.locals.db
    .collection("User")
    .find()
    .toArray()
    .then((results: Array<IUser>) => {
      console.log("results", results);
      res.json(results);
    });
});

export default router;
