const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

exports.usuarios_singup = (req, res, next) => {
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
                  estado: req.body.estado,
                  tipoUsuario: req.body.tipoUsuario
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
}

exports.usuarios_login = (req, res, next) => {
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
  }

  exports.usuarios_delete_usuario = (req, res, next) => {
    const idUsuario = req.params.id;
  
    Usuario.remove({ _id: idUsuario }).exec().then( result => {
        res.status(200).json({
          message: 'Usuario eliminado!'
        });
    }).catch((err) => {
        console.log(err);
        res.status(500).json({ error: err });
    });
  }

  exports.usuarios_get_all = (req, res, next) => {

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
}
exports.usuarios_enviar_mail = (req, res, next) => {
  var api_key = 'key-c2756a1f00f4f70f394bdf10a529c2f7';
  var domain = 'sandboxfce0a2c4b1e64be8933ad6af7183624c.mailgun.org';
  var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
  var data = {
      from: 'postmaster@sandboxfce0a2c4b1e64be8933ad6af7183624c.mailgun.org',
      to: req.body.email,
      subject: 'Confirmación de cuenta de BeneficiosUM',
      html: '<p style="color:blue;">Hola,</p>'+
      '<p>¡Gracias por registrarte a BeneficiosUM!</p>'+
      '<p>Ahora estarás al tanto de todas los beneficios que tenés por estudiar en la UM.</p>'+
      '<p>Tu número de verificación es: '+req.body.numeroVerificacion+'</p>'
  };

  mailgun.messages().send(data, function (error, body) {
      console.log(body);
  });  
}

exports.usuarios_activar = (req, res, next) => {
  var email = req.body.email;
  var numeroVerificacion = req.body.numeroVerificacion;

  Usuario.find({email: email})
      .exec()
      .then( usuario => {
        if (usuario.length >= 1) {
          if (numeroVerificacion == usuario[0].numeroVerificacion){
            Usuario.update({email: email}, {$set: {estado: true}}).exec();
          }
        } else {
          // Porque el metodo find devuelve un array
          return res.status(409).json({
            message: "Lo sentimos. El mail no existe."
          });
        }
      })
}
