import { config } from "dotenv";
import express from "express";
import morgan from "morgan";
import cors from "cors";

config();

import { songsRouter } from "./routes/songs";

const app = express();

app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);
app.use(express.json());
app.use(morgan("dev"));

//routes
app.use(songsRouter);

app.listen(process.env.PORT || 5000, () => {
  console.log("Server started");
});
