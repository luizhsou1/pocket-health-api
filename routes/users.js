const express = require('express');
const router = express.Router();

const mongoose = require('../db/mongoose');
const userModel = require('../models/UserModel')(mongoose);
const userController = require('../controllers/UserController')(userModel);
const middlewareAuth = require('../middlewares/auth');

router.get('/', middlewareAuth, userController.getAll.bind(userController));
router.get('/:_id', middlewareAuth, userController.getById.bind(userController));
router.post('/', middlewareAuth, userController.create.bind(userController));
router.put('/:_id', middlewareAuth, userController.update.bind(userController));
router.delete('/:_id', middlewareAuth, userController.remove.bind(userController));

module.exports = router;
