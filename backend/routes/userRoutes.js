const express = require("express");
const router = express.Router();
const Controllers = require("../controllers");

router.get("/", (req, res) => {
  Controllers.userController.getUsers(res);
});

router.post("/create", (req, res) => {
  Controllers.userController.createUsers(req.body, res);
});

router.post("/login", (req, res) => {
  Controllers.userController.loginUser(req, res);
});

router.put("/:id", (req, res) => {
  Controllers.userController.updateUser(req, res);
});
router.delete("/:id", (req, res) => {
  Controllers.userController.deleteUser(req, res);
});
router.get("/init", (req, res) => {
  Controllers.populateController.storeUser(req, res);
});

module.exports = router;
