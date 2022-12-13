const { Router } = require("express");
const { list, create, listBySuscriptor, listBySuscriptorActive } = require("../controller/controller.suscriptor");

const router = Router();

/* 
    path: "/api/suscriptor"
*/

router.post("/", create);
router.get("/", list);
router.get("/:suscriptorId", listBySuscriptor);
router.get("/active/:suscriptorId", listBySuscriptorActive);


module.exports = router;



