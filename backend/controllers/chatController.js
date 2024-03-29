"use strict";
const { Sequelize } = require("../dbConnect");
const Models = require("../models");
const getChats = (res) => {
  Models.Chat.findAll({})
    .then(function (data) {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      throw err;
    });
};
const getChat = (req, res) => {
  Sequelize.query("SELECT c.*, sender.emailId AS senderEmail, sender.firstName AS senderName, receiver.emailId as receiverEmail, receiver.firstName AS receiverName FROM chat c, users sender, users receiver WHERE c.senderID = sender.id AND c.receiverID=receiver.id AND c.postID="+req.params.postID)
 
    .then(function (data) {
      res.send({ result: 200, data: data[0] });
    })
    .catch((err) => {
      throw err;
    });
};
const createChats = (data, res) => {
  Models.Chat.create(data)
    .then(function (data) {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      throw err;
    });
};

const updateChat = (req, res) => {
  Models.Chat.update(req.body, { where: { id: req.params.id } })
    .then(function (data) {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      throw err;
    });
};
const deleteChat = (req, res) => {
  Models.Chat.destroy({ where: { id: req.params.id } })
    .then(function (data) {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
        console.log(err);
        res.send({ result: 500, error: err.message });
      });
};

module.exports = {
  getChats,
  createChats,
  updateChat,
  deleteChat,
  getChat
};
