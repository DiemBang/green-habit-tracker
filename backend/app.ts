import { MongoClient } from "mongodb";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import habitRouter from "./routes/habits";
import userRouter from "./routes/users";
import userHabitRouter from "./routes/userHabits";
import ecotipRouter from "./routes/ecotips";
import challengeRouter from "./routes/challenges";
import sustainabilityFactRouter from "./routes/sustainabilityFacts";
import userHabitCompletedRouter from "./routes/userHabitsCompleted";
import userChallengeCompletedRouter from "./routes/userChallengesCompleted";
import userChallengeRouter from "./routes/userChallenges";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

app.use(cors());

app.use("/api/habits", habitRouter);
app.use("/api/users", userRouter);
app.use("/api/userHabits", userHabitRouter);
app.use("/api/userHabitsCompleted", userHabitCompletedRouter);
app.use("/api/challenges", challengeRouter);
app.use("/api/userChallenges", userChallengeRouter);
app.use("/api/userChallengesCompleted", userChallengeCompletedRouter);
app.use("/api/ecotips", ecotipRouter);
app.use("/api/sustainabilityFacts", sustainabilityFactRouter);

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
