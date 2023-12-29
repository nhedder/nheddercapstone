let express = require("express");
let router = express.Router();
let Controllers = require("../controllers"); //index.js

router.get("/", (req, res) => {
 
    Controllers.postController.getPosts(res);
});

router.post("/create", (req, res) => {
    Controllers.postController.createPosts(req.body, res);
});

router.put("/:id", (req, res) => {
    Controllers.postController.updatePosts(req, res);
  });
  router.delete("/:id", (req, res) => {
    Controllers.postController.deletePosts(req, res);
  });
// router.get('/user/:uid', (req, res) => { // dynamic 
//     Controllers.postController.getUserPosts(req, res);
// })

module.exports = router;