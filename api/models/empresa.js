const mongoose = require("mongoose");

const empresasSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    nombre: { type: String, required: true },
    locales: { type: Array, required: true }
});

module.exports = mongoose.model('Empresa', empresasSchema);