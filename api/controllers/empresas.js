const mongoose = require('mongoose');
const Empresa = require('../models/empresa');

exports.empresas_get_all = (req, res, next) => {
    
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
}

exports.empresas_create = (req, res, next) => {
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
}

exports.empresas_get_empresa = (req, res, next) => {
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
}

exports.empresas_update_empresa = (req, res, next) => {
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
}

exports.empresas_delete_empresa = (req, res, next) => {
    const idEmpresa = req.params.id;

    Empresa.remove({ _id: idEmpresa }).exec().then((result) => {
        res.status(200).json(result);
    }).catch((err) => {
        console.log(err);
        res.status(500).json({ error: err });
    });
}