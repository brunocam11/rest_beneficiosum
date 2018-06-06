const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Categoria = require('../models/categoria');

router.get('/', (req, res, next) => {
    
    Categoria.find().select('-__v').exec().then((docs) => {
        console.log(docs);
        const response = {
            count: docs.length,
            categorias: docs
        };
        res.status(200).json(response)
    }).catch((err) => {
        console.log(err);
        res.status(500).json({ error: err })
    });
});

router.post('/', (req, res, next) => {
    const categoria = new Categoria({
        _id: new mongoose.Types.ObjectId(),
        nombre: req.body.nombre
    });

    categoria.save().then((result) => {
        console.log(result);
        res.status(201).json({
            message: 'La categoria fue creada!',
            categoriaCreada: categoria
        });
    }).catch((err) => {
        console.log(err);
        res.status(500).json({ error: err })
    });
});

router.get('/:id', (req, res, next) => {
    const idCategoria = req.params.id;
    
    Categoria.findById(idCategoria).select('-__v').exec().then((doc) => {
        console.log(doc);
        if (doc) {
            res.status(200).json(doc);
        } else {
            res.status(404).json({ message: 'El id no esta asociado a ninguna categoria'})
        }
    }).catch((err) => {
        console.log(err);
        res.status(500).json({ error: err });
    });
});

router.patch('/:id', (req, res, next) => {
    const idCategoria = req.params.id;

    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }

    Categoria.update({_id: id}, { $set: updateOps }).exec().then((result) => {
        res.status(200).json(result);
    }).catch((err) => {
        console.log(err);
        res.status(500).json({ error: err });
    });

    res.status(200).json({
        message: 'La categoria de id = '+ idCategoria + ' fue actualizada!'
    });
});

router.delete('/:id', (req, res, next) => {
    const idCategoria = req.params.id;

    Categoria.remove({ _id: idCategoria }).exec().then((result) => {
        res.status(200).json(result);
    }).catch((err) => {
        console.log(err);
        res.status(500).json({ error: err });
    });
});

module.exports = router;