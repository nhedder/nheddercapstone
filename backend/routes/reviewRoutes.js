let express = require("express");
let router = express.Router();
let Controllers = require("../controllers"); //index.js

router.get("/", (req, res) => {
    Controllers.reviewController.getReviews(res);
});

router.post("/create", (req, res) => {
    Controllers.reviewController.createReviews(req.body, res);
});

router.put("/:id", (req, res) => {
    Controllers.reviewController.updateReviews(req, res);
  });
  router.delete("/:id", (req, res) => {
    Controllers.reviewController.deleteReviews(req, res);
  });
// router.get('/user/:uid', (req, res) => { // dynamic 
//     Controllers.ReviewController.getUserReviews(req, res);
// })

module.exports = router;