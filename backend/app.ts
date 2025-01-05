// import express, { Express, Request, Response } from "express";

import { Express, Request, Response, Application } from "express";
const express = require("express");
const dotenv = require("dotenv");

const app: Express = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
