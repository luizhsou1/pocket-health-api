const express = require('express');
const router = express.Router();

const mongoose = require('../db/mongoose');
const UserModel = require('../models/UserModel')(mongoose);
const UserController = require('../controllers/UserController')(UserModel);

router.get('/', UserController.getAll.bind(UserController));
router.get('/:_id', UserController.getById.bind(UserController));
router.post('/', UserController.create.bind(UserController));
router.put('/:_id', UserController.update.bind(UserController));
router.delete('/:_id', UserController.remove.bind(UserController));

module.exports = router;
