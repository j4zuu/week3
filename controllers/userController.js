'use strict';
const userModel = require('../models/userModel');
const { validationResult } = require('express-validator');

const user_list_get = async (req, res) => {
  console.log("kala");
  const users = await userModel.getAllUsers();
  res.json(users);
};

const get_user_by_id = async (req, res) => {
  const users = await userModel.getUser(req.params.id)
  res.json(users)
}

const user_create = async (req, res) => {
  console.log(req.body)
  const errors = validationResult(req);
  if (!errors.isEmpty()){
    return res.status(400).json({errors: errors.array()})
  }
  const id = await userModel.insertUser(req)
  const users = await userModel.getUser(id)
  res.send(users)
}

const user_update = async (req, res) => {
  const updateOk = await userModel.updateUser(req.params.id, req)
  res.send(`updated... ${updateOk}`)
}

const user_delete = async (req, res) => {
  res.send("deleted...")
}

module.exports = {
  user_list_get,
  get_user_by_id,
  user_create,
  user_update,
  user_delete
};