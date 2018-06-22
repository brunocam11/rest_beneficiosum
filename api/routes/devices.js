const express = require('express');
const router = express.Router();

//const Device = require('../models/device');
const DevicesController = require('../controllers/devices');

router.get('/', DevicesController.devices_get_all);

router.get('/recibirToken', DevicesController.recibir_token);

module.exports = router;