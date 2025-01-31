import { Router, Request, Response } from "express";
import { IEcotip } from "../models/IEcotip.js";
import express from "express";

const router = Router();

/* GET ecotips */
router.get("/", function (req: Request, res: Response) {
  // HÄMTA (anropa databas connection som skapades i app.js )
  req.app.locals.db
    .collection("Ecotip")
    .find()
    .toArray()
    .then((results: Array<IEcotip>) => {
      res.json(results);
    });
});

/* GET ecotip for specific day */
router.get("/current", async (req: Request, res: Response): Promise<any> => {
  const day = req.params.day;

  // Get day of the year as number
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);

  // Get number of ecotips in database using await and assign to a variable
  const ecotipCount = await req.app.locals.db
    .collection("Ecotip")
    .countDocuments();

  // Get the remainder if dividing day number ecotipCount using modulo
  const dayRemainder = dayOfYear % ecotipCount;

  req.app.locals.db
    .collection("Ecotip") // Specify the type for the collection
    .find()
    .toArray()
    .then((results: IEcotip[]) => {
      if (results.length === 0) {
        // Handle case where no ecotip is found
        return res.status(404).json({ error: "Ecotip not found." });
      }
      res.json(results[dayRemainder]);
    });
});

export default router;
