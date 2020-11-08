'use strict';
const catModel = require('../models/catModel');
const { validationResult } = require('express-validator');

const cat_list_get = async (req, res) => {
  const cats = await catModel.getAllCats();
  res.json(cats);
};

const get_cat_by_id = async (req, res) => {
  const cat = await catModel.getCat(req.params.id)
  res.json(cat)
}

const cat_create = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()){
    return res.status(400).json({errors: errors.array()})
  }
  const id = await catModel.insertCat(req)
  const cat = await catModel.getCat(id)
  res.send(cat)
}

const cat_update = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()){
    return res.status(400).json({errors: errors.array()})
  }
  const updateOk = await catModel.updateCat(req)
  res.json(`{message: "updated... ${updateOk}"}`)
}

const cat_delete = async (req, res) => {
  const deleted = await catModel.deleteCat(req.params.id)
  res.send(`deleted... ${deleted}`)
}

module.exports = {
  cat_list_get,
  get_cat_by_id,
  cat_create,
  cat_update,
  cat_delete
};