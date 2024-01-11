"use strict";
const Models = require("../models");
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken"); // CommonJS syntax

const getUsers = (res) => {
  Models.User.findAll({})
    .then(function (data) {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      throw err;
    });
};

const getUser = (req,res) => {
  Models.User.findAll({where: { id: req.params.id }})
    .then(function (data) {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      throw err;
    });
};

const createUsers = async (data, res) => {
  // Hash the user's password
  data.password = await bcrypt.hash(data.password, 10);
  // Create a new user in the User model
  Models.User.create(data).then(function (data) {
      // Send the data as response
      res.send({ result: 200, data: data })
  }).catch(err => {
      // If there is an error, throw it
      throw err
  })
}

const loginUser = (req, res) => {
  // Find the user with the given username in the User model
  Models.User.findOne({ where: { emailId: req.body.emailId } }).then(
      async function (user) {
          // If the user exists and the password is correct, send the user data as a response
          if (user && (await bcrypt.compare(req.body.password, user.password))) {
              // Replace "your-secret-key" with your actual secret key
              const secretKey = "817960";

              // Create a payload with user information
              const payload = {
                  userId: user.id,
                  username: user.username,
              };
              // Generate a token with jwt.sign
              const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });

              // Send the user data and token in the response
              res.send({ result: 200, data: { user, token } });
          } else {
              res.send({ result: 400, data: "Invalid User" });
          }
      }
  ).catch((err) => {
      // If there is an error, handle it
      console.error(err);
      res.status(500).send({ result: 500, data: "Internal Server Error" });
  });
};

const updateUser = (req, res) => {
  Models.User.update(req.body, { where: { id: req.params.id } })
    .then(function (data) {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      throw err;
    });
};
const deleteUser = (req, res) => {
  Models.User.destroy({ where: { id: req.params.id } })
    .then(function (data) {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
        console.log(err);
        res.send({ result: 500, error: err.message });
      });
};

module.exports = {
  getUsers,
  createUsers,
  updateUser,
  deleteUser,
  loginUser,
  getUser
};
