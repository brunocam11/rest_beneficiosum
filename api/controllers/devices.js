const mongoose = require('mongoose');
const Device = require('../models/device');

exports.recibir_token = (req, res, next) => {
    console.log(req.body);
    res.status(200).json({
      //message: 'Hola'
    });
    //Guardar informacion del usuario
    Device.find({ duuid: req.body.duuid })
          .exec()
          .then( device => {
            if (device.length >= 1) {
              Device.update({duuid: duuid}, {$set: {email: req.body.email, token: req.body.token}}).exec().then((result) => {
                res.status(200).json(result);
            }).catch((err) => {
                console.log(err);
                res.status(500).json({ error: err });
            });
            } else {
              // Registrar el device
              const device = new Device({
                _id: new mongoose.Types.ObjectId(),
                duuid: req.body.duuid,
                email: req.body.email,
                token: req.body.token,
                plataforma: req.body.plataforma
              });
              device.save().then((result) => {
                console.log(result);
                res.status(201).json({
                  message: 'El device ha sido registrado!',
                  deviceCreado: device
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

exports.borrar_token = (req, res, next) => {
  const email = req.params.email;
  console.log('email: '+email);

  Device.remove({ email: email }).exec().then( result => {
      res.status(200).json({
        message: 'Device eliminado!'
      });
  }).catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
  });
}