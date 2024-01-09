"use strict";
const axios = require("axios");
const Models = require("../models");
const { Op } = require("sequelize");
const Controllers = require("../controllers");
const bcrypt = require('bcryptjs');


const storeUser = async (req, res) => {
  try {
    let userResponse = await axios.get("http://localhost:3000/users");
    let skillResponse = await axios.get("http://localhost:3000/skills");

    const users = userResponse.data;
    const skills = skillResponse.data;

    for (let skill of skills) {
      const formatDesc = {
        skillName: skill.skillName,

        description: skill.description,

        category: skill.category,
      };

      let [newDescription] = await Models.Skill.findOrCreate({
        where: { skillName: skill.skillName },
        defaults: formatDesc,
      });
    }
    for (let user of users) {
      console.log(user.skillId);

      const formatDesc = {
        firstName: user.firstName,

        lastName: user.lastName,

        emailId: user.email,

        password: await bcrypt.hash(user.password, 10),

        displayPicture: user.displayPicture,

        skillId: user.skillId,
      };

      let [newDescription] = await Models.User.findOrCreate({
        where: { firstName: user.firstName },
        defaults: formatDesc,
      });
    }
    res.send("fetchedRoutes");
  } catch (err) {
    console.log(err.message);
    res.send(err.message);
  }
  
};

module.exports = {
  storeUser,
};
