const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Device = require('../models/device');

router.post('/recibirToken', (req, res, next) => {
    console.log(req.body);
    res.status(200).json({
      message: 'Hola'
    });
    // Guardar informacion del usuario
    // Device.find({ email: req.body.email })
    //       .exec()
    //       .then( device => {
    //         if (device.length >= 1) {
    //           // Ya se registro una vez ese device

    //         } else {
    //           // Registrar el device
    //           const device = new Device({
    //             deviceId: req.body.deviceId,
    //             email: req.body.email,
    //             token: req.body.token,
    //             plataforma: req.body.plataforma
    //           });
    //           device.save().then( (result) => {
    //             console.log(result);
    //             res.status(201).json({
    //               message: 'El device ha sido registrado!',
    //               usuarioCreado: usuario
    //             });
    //           })
    //           .catch((err) => {
    //             console.log(err);
    //             res.status(500).json({ error: err })
    //           });
    //         }
    //       }).catch((err) => {
    //         console.log(err);
    //         res.status(500).json({ error: err });
    //       });
});

module.exports = router;

/*
Usuario.find({email: req.body.email})
      .exec()
      .then( usuario => {
        if (usuario.length >= 1) {
          // Porque el metodo find devuelve un array
          return res.status(409).json({
            message: "Lo sentimos. Ya exite una cuenta con ese email asociado"
          });
        } else {
          bcrypt.hash(req.body.password, 10, (err, hashedPass) => {
            if (err) {
              return res.status(500).json({
                error: err
              });
            } else {
              const usuario = new Usuario({
                  _id: new mongoose.Types.ObjectId(),
                  nombre: req.body.nombre,
                  email: req.body.email,
                  password: hashedPass,
                  numeroVerificacion: req.body.numeroVerificacion,
                  estado: req.body.estado
              });
              usuario.save().then((result) => {
                  console.log(result);
                  res.status(201).json({
                      message: 'El usuario fue creado!',
                      usuarioCreado: usuario
                  });
              }).catch((err) => {
                  console.log(err);
                  res.status(500).json({ error: err })
              });
            }
          });
        }
      })
*/

/*
  router.patch('/:id', (req, res, next) => {
    const idBeneficio = req.params.id;

    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }

    Beneficio.update({_id: id}, { $set: updateOps }).exec().then((result) => {
        res.status(200).json(result);
    }).catch((err) => {
        console.log(err);
        res.status(500).json({ error: err });
    });

    res.status(200).json({
        message: 'El beneficio de id = '+ idBeneficio + ' fue actualizado!'
    });
});


*/