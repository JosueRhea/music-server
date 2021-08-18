const multer = require("multer");
const { getConnection } = require("../database");
const { GridFSBucket, ObjectId } = require("mongodb");
const { Readable } = require("stream");

const uploadSong = (req, res) => {
  const storage = multer.memoryStorage();
  const upload = multer({
    storage: storage,
    limits: {
      fields: 1,
      fileSize: 50000000,
      files: 1,
      parts: 2,
    },
  });

  upload.single("song")(req, res, (err) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: err.message });
    }

    const { name } = req.body;
    //   const { song } = req.file;

    const redableSongStream = new Readable();
    redableSongStream.push(req.file.buffer);
    redableSongStream.push(null);

    const db = getConnection();
    const bucket = new GridFSBucket(db, {
      bucketName: "songs",
    });

    const uploadStream = bucket.openUploadStream(name);
    const id = uploadStream.id;
    redableSongStream.pipe(uploadStream);

    uploadStream.on("error", () => {
      return res.status(400).json({ error: "Something went wrong" });
    });

    uploadStream.on("finish", () => {
      return res.status(200).json({ message: "File uploaded", id });
    });
  });
};

const getSongs = async (req, res) => {
  const db = getConnection();
  const files = db.collection("songs.files");

  const songs = await files.find({}).toArray();

  res.status(200).json(songs);
};

const getSong = (req, res) => {
  let songId;
  let db = getConnection();
  try {
    songId = new ObjectId(req.params.id);
    res.set("Content-Type", "audio/mp3");
    res.set("accept-ranges", "bytes");

    const bucket = new GridFSBucket(db, {
      bucketName: "songs",
    });

    const downloadStream = bucket.openDownloadStream(songId);

    downloadStream.on("data", (chunk) => {
      res.write(chunk);
    });

    downloadStream.on("error", () => {
      return res.status(400).json({ error: "Something went wrong" });
    });

    downloadStream.on("end", () => {
      res.end();
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  uploadSong,
  getSongs,
  getSong,
};
