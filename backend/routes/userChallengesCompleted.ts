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

export const getTotalPointsForUserChallengesCompleted = async (
  userID: string,
  req: Request
): Promise<number> => {
  const result = await req.app.locals.db
    .collection("UserChallengeCompleted")
    .aggregate([
      {
        // Match documents for the given userID
        $match: { userID: userID }, //get item from local storage?
      },
      {
        // Perform a $lookup to join with the Challenge collection
        $lookup: {
          from: "Challenge",
          localField: "challengeName",
          foreignField: "name",
          as: "challengeDetails",
        },
      },
      {
        // Unwind the challengeDetails array to flatten the documents
        $unwind: "$challengeDetails",
      },
      {
        // Group by userID and calculate the total points
        $group: {
          _id: "$userID",
          totalPoints: { $sum: "$challengeDetails.points" },
        },
      },
    ])
    .toArray();

  return result.length > 0 ? result[0].totalPoints : 0;
};

export default router;
