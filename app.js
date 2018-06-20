const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const beneficiosRoutes = require('./api/routes/beneficios');
const empresasRoutes = require('./api/routes/empresas');
const categoriasRoutes = require('./api/routes/categorias');
const usuariosRoutes = require('./api/routes/usuarios');
const devicesRoutes = require('./api/routes/devices');
const pushNotificationSender = require('./sendNotification');

//pushNotificationSender.enviarMensaje();

mongoose.connect('mongodb+srv://beneficiosum:beneficiosum@beneficios-um-rest-87dca.mongodb.net/test?retryWrites=false');

app.use(morgan('dev'));
app.use('/fotos', express.static('fotos'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// CORS Allow
app.use((req, res, next) => {
    res.header('Allow-Control-Allow-Origin', '*');
    res.header('Allow-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Origin','*');

    if(req.method === 'OPTIONS') {
        res.header('Allow-Control-Allow-Methods', 'PUT, POST, GET, PATCH, DELETE');
        return res.status(200).json({});
    }
    next();
});

// Rutas
app.use('/beneficios', beneficiosRoutes);
app.use('/empresas', empresasRoutes);
app.use('/categorias', categoriasRoutes);
app.use('/usuarios', usuariosRoutes);
app.use('/devices', devicesRoutes);


// Si la peticion pasa por todas las rutas
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);    // Envia la peticion all middleware siguiente
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: error.message
    });
});

module.exports = app;