import { Router, Request, Response } from "express";
import { IUser } from "../models/IUser";
import crypto from "crypto";

var express = require("express");
const bcrypt = require("bcrypt");

const router = Router();
const ObjectId = require("mongodb").ObjectId;

const saltRounds = 10;

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

/* Create new user */
router.post("/add", async (req: Request, res: Response) => {
  console.log("Incoming request body:", req.body);
  try {
    // Encrypt Password
    const userPw: string = req.body.password;
    console.log("User Password:", userPw);
    console.log("User Password:", saltRounds);
    const hashedPW = await bcrypt.hash(userPw, saltRounds);

    // Create New User Object
    const newUser = {
      Name: req.body.name,
      Email: req.body.email,
      Password: hashedPW,
    };

    // Insert User into Database
    const result = await req.app.locals.db
      .collection("User")
      .insertOne(newUser);
    console.log("Insert Result:", result);
    let userToken = await setUserToken(req, result.insertedId);

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
async function setUserToken(req: Request, userId: number): Promise<string> {
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
  console.log("Incoming request body:", req.body);

  req.app.locals.db
    .collection("User")
    .findOne({ Email: checkEmail })
    .then(async (user: IUser) => {
      bcrypt
        .compare(checkPassword, user.Password)
        .then(async function (result: boolean) {
          if (result === true) {
            let userToken = await setUserToken(req, user._id);
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
