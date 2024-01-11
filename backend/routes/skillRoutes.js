let express = require("express");
let router = express.Router();
let Controllers = require("../controllers"); //index.js

router.get("/", (req, res) => {
  Controllers.skillController.getSkills(res);
});

router.post("/create", (req, res) => {
  Controllers.skillController.createSkills(req.body, res);
});

router.put("/:id", (req, res) => {
  Controllers.skillController.updateSkills(req, res);
});
router.delete("/:id", (req, res) => {
  Controllers.skillController.deleteSkills(req, res);
});

module.exports = router;
