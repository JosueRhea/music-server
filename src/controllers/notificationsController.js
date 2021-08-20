const webpush = require("../webpushConfig");
const { getConnection } = require("../database");

const suscribeUser = async (req, res) => {
  try {
    const db = getConnection();
    const collectionRef = db.collection("users");

    const insertResult = await collectionRef.insert(req.body);
    res.status(200).json(insertResult);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const push = async (req, res) => {
  try {
    const payload = JSON.stringify({
      title: "To you",
      message: `${req.body.displayName} posted a message`,
    });

    const db = getConnection();
    const collection = db.collection("users");

    const users = await collection.find({}).toArray();
    res.status(200).json();

    users.map(async (suscription) => {
      await webpush.sendNotification(suscription, payload);
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  suscribeUser,
  push,
};
