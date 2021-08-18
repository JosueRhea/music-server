const { Router } = require("express");
const router = Router();

const { getSongs, uploadSong, getSong } = require("../controllers/songsControllers");

router.get("/songs", getSongs);

router.get("/songs/:id", getSong);

router.post("/song/upload", uploadSong);

module.exports = router;
