const { Router } = require("express");
const router = Router();

const {
  getSongs,
  uploadSong,
  getSong,
  uploadSongWithLink,
} = require("../controllers/songsControllers");

router.get("/songs", getSongs);

router.get("/songs/:id", getSong);

router.post("/song/upload", uploadSong);

router.post("/upload", uploadSongWithLink);

module.exports = router;
