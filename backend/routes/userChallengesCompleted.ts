import { Router, Request, Response } from "express";
import { IUserChallengeCompleted } from "../models/IUserChallengeCompleted.js";
import express from "express";

const router = Router();

/* GET userChallenges */
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

/* GET userChallengesCompleted for specific user */
router.post("/", async (req: Request, res: Response): Promise<any> => {
  let findUser;
  try {
    findUser = req.body.userID;
  } catch (error) {
    return (res as Response).json({ error: "Invalid User ID format." });
  }
  req.app.locals.db
    .collection("UserChallengeCompleted") // Specify the type for the collection
    .find({ userID: findUser })
    .toArray()
    .then((results: IUserChallengeCompleted[]) => {
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
