import { client } from "../database";
import { GridFSBucket, ObjectId } from "mongodb";
import ytdl = require("ytdl-core");
import { Request, Response } from "express";

const uploadSongWithLink = async (req: Request, res: Response) => {
  try {
    const { url = null } = req.query;
    const { name = null } = req.body;

    if (!name) return res.status(400).json({ error: "Please give a name" });
    if (!url) return res.status(400).json({ error: "Please give a url" });

    if (typeof url !== "string")
      return res
        .status(400)
        .json({ error: "Error parsing the url, must be a string" });

    const isValidUrl = ytdl.validateURL(url);
    if (!isValidUrl) return res.status(400).json({ error: "Invalid url" });

    const info = await ytdl(url, {
      filter: (format) => format.itag == 250,
    });

    if (!info) return res.status(400).json({ error: "Something went wrong" });

    await client.connect();
    const db = client.db("tracksdb");
    const bucket = new GridFSBucket(db, {
      bucketName: "songs",
    });

    const uploadStream = bucket.openUploadStream(name);
    const id = uploadStream.id;
    info.pipe(uploadStream);

    uploadStream.on("error", () => {
      return res.status(400).json({ error: "Something went wrong" });
    });

    uploadStream.on("finish", () => {
      return res.status(200).json({ message: "File uploaded", id });
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const getSongs = async (req: Request, res: Response) => {
  await client.connect();
  const db = client.db("tracksdb");
  const files = db.collection("songs.files");

  const songs = await files.find({}).toArray();

  res.status(200).json(songs);
};

const getSong = async (req: Request, res: Response) => {
  let songId;
  try {
    await client.connect();
    const db = client.db("tracksdb");
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
    return res.status(400).json({ error });
  }
};

export { getSongs, getSong, uploadSongWithLink };
