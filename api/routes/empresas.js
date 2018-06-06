const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Empresa = require('../models/empresa');

router.get('/', (req, res, next) => {
    
    Empresa.find().select('-__v').exec().then((docs) => {
        console.log(docs);
        const response = {
            count: docs.length,
            empresas: docs
        };
        res.status(200).json(response)
    }).catch((err) => {
        console.log(err);
        res.status(500).json({ error: err })
    });
});

router.post('/', (req, res, next) => {
    const empresa = new Empresa({
        _id: new mongoose.Types.ObjectId(),
        nombre: req.body.nombre,
        locales: req.body.locales
    });

    empresa.save().then((result) => {
        console.log(result);
        res.status(201).json({
            message: 'La empresa fue creada!',
            empresaCreada: empresa
        });
    }).catch((err) => {
        console.log(err);
        res.status(500).json({ error: err })
    });
});

router.get('/:id', (req, res, next) => {
    const idEmpresa = req.params.id;
    
    Empresa.findById(idEmpresa).select('-__v').exec().then((doc) => {
        console.log(doc);
        if (doc) {
            res.status(200).json(doc);
        } else {
            res.status(404).json({ message: 'El id no esta asociado a ninguna empresa'})
        }
    }).catch((err) => {
        console.log(err);
        res.status(500).json({ error: err });
    });
});

router.patch('/:id', (req, res, next) => {
    const idEmpresa = req.params.id;

    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }

    Empresa.update({_id: id}, { $set: updateOps }).exec().then((result) => {
        res.status(200).json(result);
    }).catch((err) => {
        console.log(err);
        res.status(500).json({ error: err });
    });

    res.status(200).json({
        message: 'La empresa de id = '+ idEmpresa + ' fue actualizada!'
    });
});

router.delete('/:id', (req, res, next) => {
    const idEmpresa = req.params.id;

    Empresa.remove({ _id: idEmpresa }).exec().then((result) => {
        res.status(200).json(result);
    }).catch((err) => {
        console.log(err);
        res.status(500).json({ error: err });
    });
});

module.exports = router;