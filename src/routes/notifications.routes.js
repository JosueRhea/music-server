const { Router } = require("express");
const router = Router();

const {
  suscribeUser,
  push,
} = require("../controllers/notificationsController");

router.post("/suscription", suscribeUser);
router.post("/not", push);

module.exports = router;
