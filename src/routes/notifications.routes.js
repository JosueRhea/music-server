const { Router } = require("express");
const router = Router();

const {suscribeUser} = require("../controllers/notificationsController")

router.post("/suscription", suscribeUser)

module.exports = router;