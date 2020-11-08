'use strict';
const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.send(`Hello world <a href="cat"> click </a> <br> with test is ${req.query.test} and fun is  ${req.query.more}`)
});


router.post('/', (req, res) => {
  console.log(req.body)
  res.send('Hello root route')
});

router.put('/', (req, res) => {
  res.send('Http put on route')
});

module.exports = router