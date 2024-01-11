let express = require("express");
let router = express.Router();
let Controllers = require("../controllers"); //index.js

router.get("/", (req, res) => {
  Controllers.chatController.getChats(res);
});

router.get("/:postID", (req, res) => {
  Controllers.chatController.getChat(req, res);
});

router.post("/create", (req, res) => {
  Controllers.chatController.createChats(req.body, res);
});

router.put("/:id", (req, res) => {
  Controllers.chatController.updateChat(req, res);
});
router.delete("/:id", (req, res) => {
  Controllers.chatController.deleteChat(req, res);
});

module.exports = router;
