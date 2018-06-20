const mongoose = require('mongoose');
const Device = require('../models/device');

exports.recibir_token = (req, res, next) => {
    console.log(req.body);
    res.status(200).json({
      message: 'Hola'
    });
    //Guardar informacion del usuario
    Device.find({ email: req.body.email })
          .exec()
          .then( device => {
            if (device.length >= 1) {
              // Ya se registro una vez ese device
            } else {
              // Registrar el device
              const device = new Device({
                deviceId: req.body.deviceId,
                email: req.body.email,
                token: req.body.token,
                plataforma: req.body.plataforma
              });
              device.save().then( (result) => {
                console.log(result);
                res.status(201).json({
                  message: 'El device ha sido registrado!',
                  usuarioCreado: usuario
                });
              })
              .catch((err) => {
                console.log(err);
                res.status(500).json({ error: err })
              });
            }
          }).catch((err) => {
            console.log(err);
            res.status(500).json({ error: err });
          });
};

exports.devices_get_all = (req, res, next) => {
  Device.find().select('-__v').exec().then((docs) => {
      console.log(docs);
      const response = {
          count: docs.length,
          devices: docs
      };
      res.status(200).json(response)
  }).catch((err) => {
      console.log(err);
      res.status(500).json({ error: err })
  });
}