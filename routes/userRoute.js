'use strict';
const express = require('express')
const userController = require('../controllers/userController');
const { body } = require('express-validator');
const router = express.Router()

router.get('/', userController.user_list_get);
router.post('/',
    [
        body('name', 'minimum length').isLength({min: 3}),
        body('email', 'is not valid email').isEmail(),
        body('password', 'minimum length is 8, at least 1 capital letter').matches('(?=.*[A-Z]).{8,}'),
    ],
    userController.user_create);

router.get('/:id', userController.get_user_by_id);
router.put('/:id', userController.user_update);
router.delete('/:id', userController.user_delete)

module.exports = router;