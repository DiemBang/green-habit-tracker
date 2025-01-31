import { MongoClient } from "mongodb";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import habitRouter from "../routes/habits.js";
import userRouter from "../routes/users.js";
import userHabitRouter from "../routes/userHabits.js";
import ecotipRouter from "../routes/ecotips.js";
import challengeRouter from "../routes/challenges.js";
import sustainabilityFactRouter from "../routes/sustainabilityFacts.js";
import userHabitCompletedRouter from "../routes/userHabitsCompleted.js";
import userChallengeCompletedRouter from "../routes/userChallengesCompleted.js";
import userChallengeRouter from "../routes/userChallenges.js";
import userNotificationRouter from "../routes/userNotifications.js";
import notificationSettingsRouter from "../routes/notificationSettings.js";
import progressSummaryRouter from "../routes/progressSummary.js";

dotenv.config();

const allowedOrigin = process.env.CORS_ORIGIN || "http://localhost:5173"; // Default to local frontend in dev

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors({ origin: allowedOrigin, credentials: true }));
app.use(cookieParser());

app.use("/api/habits", habitRouter);
app.use("/api/users", userRouter);
app.use("/api/userHabits", userHabitRouter);
app.use("/api/userHabitsCompleted", userHabitCompletedRouter);
app.use("/api/challenges", challengeRouter);
app.use("/api/userChallenges", userChallengeRouter);
app.use("/api/userChallengesCompleted", userChallengeCompletedRouter);
app.use("/api/ecotips", ecotipRouter);
app.use("/api/sustainabilityFacts", sustainabilityFactRouter);
app.use("/api/userNotifications", userNotificationRouter);
app.use("/api/notificationSettings", notificationSettingsRouter);
app.use("/api/progressSummary", progressSummaryRouter);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

const username = process.env.MONGO_ROOT_USERNAME;
const password = process.env.MONGO_ROOT_PASSWORD;
const url = process.env.MONGO_URL;

const connectionString = `mongodb+srv://${username}:${password}@${url}`;
// const connectionString = `mongodb://${username}:${password}@127.0.0.1:27017`;

await MongoClient.connect(connectionString).then((client: MongoClient) => {
  console.log("We're connected to the database!");
  const db = client.db("green-habit-tracker");
  app.locals.db = db;
});

export default app;
