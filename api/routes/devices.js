const express = require('express');
const router = express.Router();

//const Device = require('../models/device');
const DevicesController = require('../controllers/devices');

router.get('/', DevicesController.devices_get_all);

router.post('/recibirToken', DevicesController.recibir_token);

router.post('/borrarDevice/:email', DevicesController.borrar_token);

module.exports = router;