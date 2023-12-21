let express = require("express");
let router = express.Router();
let Controllers = require("../controllers"); //index.js

router.get("/", (req, res) => {
    Controllers.tradeController.getTrades(res);
});

router.post("/create", (req, res) => {
    Controllers.tradeController.createTrades(req.body, res);
});

router.put("/:id", (req, res) => {
    Controllers.tradeController.updateTrades(req, res);
  });
  router.delete("/:id", (req, res) => {
    Controllers.tradeController.deleteTrades(req, res);
  });
// router.get('/user/:uid', (req, res) => { // dynamic 
//     Controllers.TradeController.getUserTrades(req, res);
// })

module.exports = router;