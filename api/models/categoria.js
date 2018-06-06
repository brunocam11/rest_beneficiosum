const mongoose = require("mongoose");

const categoriasSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    nombre: { type: String, required: true }
});

module.exports = mongoose.model('Categoria', categoriasSchema);