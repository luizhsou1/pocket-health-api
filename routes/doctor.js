const express = require('express');
const router = express.Router();

const mongoose = require('../db/mongoose');
const doctorModel = require('../models/DoctorModel')(mongoose);
const doctorController = require('../controllers/DoctorController')(doctorModel);
const middlewareAuth = require('../middlewares/auth');

router.get('/', middlewareAuth, doctorController.getAll.bind(doctorController));
router.get('/:_id', middlewareAuth, doctorController.getById.bind(doctorController));
router.post('/', middlewareAuth, doctorController.create.bind(doctorController));
router.put('/:_id', middlewareAuth, doctorController.update.bind(doctorController));
router.delete('/:_id', middlewareAuth, doctorController.remove.bind(doctorController));

module.exports = router;
