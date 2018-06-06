const mongoose = require("mongoose");

const usuariosSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    nombre: { type: String, required: true },
    email: { type: String, required: true, match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/ },
    password: { type: String, required: true},
    numeroVerificacion: { type: String, required: false },
    estado: { type: Boolean, required: false }
});

module.exports = mongoose.model('Usuario', usuariosSchema);
