const webpush = require("../webpushConfig");

let pushSuscription;

const suscribeUser = async (req, res) => {
  try {
    pushSuscription = req.body;
    res.status(200);

    const payload = JSON.stringify({
      title: "My custom notification",
      message: "Hello from server",
    });
    await webpush.sendNotification(pushSuscription, payload);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  suscribeUser,
};
