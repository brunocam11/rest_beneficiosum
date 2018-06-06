const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
const checkAuth = require('../middleware/check-auth');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './fotos');
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  }
});

const fileFilter = (req, res, cb) => {
  // solo aceptar imagenes
  if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
    cb(null, true);
  } else {
    cb(null, false);
  }
}

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 2
  },
  fileFilter: fileFilter
});

const Beneficio = require('../models/beneficio');

router.get('/', (req, res, next) => {

    Beneficio.find().select('-__v').exec().then((docs) => {
        console.log(docs);
        const response = {
            count: docs.length,
            beneficios: docs
        };
        res.status(200).json(response)
    }).catch((err) => {
        console.log(err);
        res.status(500).json({ error: err })
    });
});

router.post('/', upload.single('foto'), (req, res, next) => {
    const beneficio = new Beneficio({
        _id: new mongoose.Types.ObjectId(),
        titulo: req.body.titulo,
        descripcion: req.body.descripcion,
        promocion: req.body.promocion,
        locales: req.body.locales,
        foto: req.file.path,
        categorias: req.body.categorias,
        fch_inicio: req.body.fch_inicio,
        fch_fin: req.body.fch_fin
    });

    beneficio.save().then((result) => {
        console.log(result);
        res.status(201).json({
            message: 'El beneficio fue creado!',
            beneficioCreado: beneficio
        });
    }).catch((err) => {
        console.log(err);
        res.status(500).json({ error: err })
    });
});

router.get('/:id', (req, res, next) => {
    const idBeneficio = req.params.id;

    Beneficio.findById(idBeneficio).select('-__v').exec().then((doc) => {
        console.log(doc);
        if (doc) {
            res.status(200).json(doc);
        } else {
            res.status(404).json({ message: 'El id no esta asociado a ningun beneficio'})
        }
    }).catch((err) => {
        console.log(err);
        res.status(500).json({ error: err });
    });
});

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

router.delete('/:id', (req, res, next) => {
    const idBeneficio = req.params.id;

    Beneficio.remove({ _id: idBeneficio }).exec().then((result) => {
        res.status(200).json(result);
    }).catch((err) => {
        console.log(err);
        res.status(500).json({ error: err });
    });
});

module.exports = router;