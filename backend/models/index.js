"use strict";
const User = require("./user"); 
const Post = require("./post"); 
const Review = require("./review"); 
const Skill = require("./skill"); 
const Trade = require("./trade");
const Chat = require("./chat"); //require the models

async function init() {
  await Skill.sync(); 
  await User.sync(); 
  await Post.sync(); 
  await Trade.sync(); //sync the models
  await Review.sync(); 
  await Chat.sync();
}
init();
module.exports = {
  User,
  Post,
  Review,
  Skill,
  Trade,
  Chat, //export the models
};
