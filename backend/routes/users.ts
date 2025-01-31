import { Router, Request, Response } from "express";
import { IUser } from "../models/IUser.js";
import crypto from "crypto";
import express from "express";
import bcrypt from "bcrypt";
import mongodb from "mongodb";
import {
  createDefaultNotificationSettings,
  notifyDailyHabitReminder,
  runNotifyOnFirstDayOfMonth,
} from "../services/notificationService.js";

const router = Router();
const ObjectId = mongodb.ObjectId;

const saltRounds = 10;

/* GET all users */
router.get("/", (req: Request, res: Response) => {
  // HÄMTA (anropa databas connection som skapades i app.js )
  req.app.locals.db
    .collection("User")
    .find()
    .toArray()
    .then((results: Array<IUser>) => {
      res.json(results);
    });
});

/* GET specific user */
router.post("/", async (req: Request, res: Response): Promise<any> => {
  let findUser;
  try {
    findUser = new ObjectId(req.body._id);
  } catch (error) {
    return (res as Response).json({ error: "Invalid User ID format." });
  }
  req.app.locals.db
    .collection("User") // Specify the type for the collection
    .findOne({ _id: findUser })
    .then((results: IUser[]) => {
      if (results.length === 0) {
        // Handle case where no user is found
        return res.status(404).json({ error: "User not found." });
      }
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

/* Create new user */
router.post("/add", async (req: Request, res: Response) => {
  try {
    // Encrypt Password
    const userPw: string = req.body.password;

    const hashedPW = await bcrypt.hash(userPw, saltRounds);

    const isProduction = process.env.NODE_ENV === "production";

    // Create New User Object
    const newUser = {
      name: req.body.name,
      email: req.body.email,
      password: hashedPW,
    };

    // Insert User into Database
    const result = await req.app.locals.db
      .collection("User")
      .insertOne(newUser);

    let userToken = await setUserToken(req, result.insertedId);

    res.cookie("authToken", userToken, {
      httpOnly: true, // Prevent JavaScript access for security
      secure: isProduction, // Send only over HTTPS in production
      sameSite: isProduction ? "none" : "lax", // ✅ Allow cross-site in production, but stricter in development,
      maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days in milliseconds
    });

    createDefaultNotificationSettings(req, result.insertedId);

    res.json({
      message: `New user created with ID ${result.insertedId}`,
      userToken: userToken,
      userID: result.insertedId,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

/* Set User Token */
async function setUserToken(req: Request, userId: string): Promise<string> {
  try {
    // Generate Token
    const userToken: string = crypto.randomBytes(64).toString("hex");

    // Update User in Database
    const myquery = { _id: userId };
    const newValues = { $set: { userToken: userToken } };

    const result = await req.app.locals.db
      .collection("User")
      .updateOne(myquery, newValues);
    if (result.modifiedCount > 0) {
      console.log("UserToken updated successfully");
    } else {
      console.warn("No user was updated. Ensure the ID is correct.");
    }

    return userToken;
  } catch (error) {
    console.error("Error updating user token:", error);
    throw error; // Rethrow to allow the caller to handle the error
  }
}

/* Log in User */
router.post("/login", async (req, res): Promise<any> => {
  let checkEmail = req.body.email;
  let checkPassword = req.body.password;

  const isProduction = process.env.NODE_ENV === "production";

  req.app.locals.db
    .collection("User")
    .findOne({ email: checkEmail })
    .then(async (user: IUser) => {
      bcrypt
        .compare(checkPassword, user.password)
        .then(async function (result: boolean) {
          if (result === true) {
            let userToken = await setUserToken(req, user._id);
            await notifyDailyHabitReminder(req, user._id.toString());
            await runNotifyOnFirstDayOfMonth(req, user._id.toString());
            res.cookie("authToken", userToken, {
              httpOnly: true, // Prevent JavaScript access for security
              secure: isProduction, // Send only over HTTPS in production
              sameSite: isProduction ? "none" : "lax", // ✅ Allow cross-site in production, but stricter in development,
              maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days in milliseconds
            });
            return res.json({
              email: checkEmail,
              userToken: userToken,
              userID: user._id,
            });
          } else {
            return res.status(401).json({ message: "Incorrect login details" });
          }
        });
    })
    .catch((error: unknown) => {
      console.error("Error:", error);
      res.status(500).send({ message: "Internal Server Error" });
    });
});

export default router;
