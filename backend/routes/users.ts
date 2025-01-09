import { Router, Request, Response } from "express";
import { IUser } from "../models/IUser";

var express = require("express");
const router = Router();
const ObjectId = require("mongodb").ObjectId;

/* GET all users */
router.get("/", (req: Request, res: Response) => {
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

/* GET specific users */
router.post("/", async (req: Request, res: Response): Promise<any> => {
  let findUser;
  try {
    findUser = new ObjectId(req.body._id);
  } catch (error) {
    return (res as Response).json({ error: "Invalid User ID format." });
  }
  req.app.locals.db
    .collection("User") // Specify the type for the collection
    .find({ _id: findUser })
    .toArray()
    .then((results: IUser[]) => {
      if (results.length === 0) {
        // Handle case where no user is found
        return res.status(404).json({ error: "User not found." });
      }
      console.log("results", results);
      res.json(results);
    })
    .catch((dbError: unknown) => {
      // Handle database errors
      console.error("Database error:", dbError);
      res
        .status(500)
        .json({ error: "Internal Server Error. Please try again later." });
    });
});

export default router;
