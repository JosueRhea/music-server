import { Router } from "express";
const songsRouter = Router();
import {
  getSongs,
  getSong,
  uploadSongWithLink,
} from "../controllers/songsControllers";

songsRouter.get("/songs", getSongs);

songsRouter.get("/songs/:id", getSong);

songsRouter.post("/upload", uploadSongWithLink);

export { songsRouter };
