import { MongoClient } from "mongodb";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import habitRouter from "./routes/habit";
import userRouter from "./routes/users";
import userHabitRouter from "./routes/userHabit";
import ecotipsRouter from "./routes/ecotips";
import sustainabilityFactsRouter from "./routes/sustainabilityFacts";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.use("/api/habits", habitRouter);
app.use("/api/users", userRouter);
app.use("/api/userHabit", userHabitRouter);
app.use("/api/ecotips", ecotipsRouter);
app.use("/api/sustainabilityFacts", sustainabilityFactsRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

const username = process.env.MONGO_ROOT_USERNAME;
const password = process.env.MONGO_ROOT_PASSWORD;

const connectionString = `mongodb://${username}:${password}@127.0.0.1:27017`;

MongoClient.connect(connectionString).then((client: MongoClient) => {
  console.log("We're connected to the database!");
  const db = client.db("green-habit-tracker");
  app.locals.db = db;
});
