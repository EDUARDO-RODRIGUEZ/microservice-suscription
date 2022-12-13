const { Router } = require("express");
const { create, update, remove, list } = require("../controller/controller.suscription");

const router = Router();

/* 
    path: "/api/suscription"
*/

router.get("/", list);
router.post("/", create);
router.put("/", update);
router.delete("/:id", remove);

module.exports = router;