const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const Usuario = require('../models/usuario');

router.post('/signup', (req, res, next) => {
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
});

router.post('/login', (req, res, next) => {
  Usuario.find({ email: req.body.email })
    .exec()
    .then( usuario => {
      if (usuario.length < 1) {
        return res.status(401).json({
          message:  'Auth failed'
        });
      } 
      bcrypt.compare(req.body.password, usuario[0].password, (err, result) => {
         if (err) {
            return res.status(401).json({
              message: 'Auth failed'
            });
          }
          if (result) {
            const token = jwt.sign(
              { 
                email: usuario[0].email,
                idUsuario: usuario[0]._id
              }, 
              process.env.JWT_KEY,
              {
                expiresIn:  "1h"
              }
            );
            return res.status(200).json({
              message: 'Auth successful',
              token: token
            });
          }        
          res.status(401).json({
            message: 'Auth failed'
          });
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.delete('/:id', (req, res, next) => {
  const idUsuario = req.params.id;

  Usuario.remove({ _id: idUsuario }).exec().then( result => {
      res.status(200).json({
        message: 'Usuario eliminado!'
      });
  }).catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
  });
});

router.get('/', (req, res, next) => {

    Usuario.find().select('-__v').exec().then((docs) => {
        console.log(docs);
        const response = {
            count: docs.length,
            usuarios: docs
        };
        res.status(200).json(response)
    }).catch((err) => {
        console.log(err);
        res.status(500).json({ error: err })
    });
});


module.exports = router;