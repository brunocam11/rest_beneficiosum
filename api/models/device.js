const mongoose = require("mongoose");

const devicesSchema = mongoose.Schema({
    duuid: { type: String, required: true },
    email: { type: String, required: true, match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/ },
    token: { type: String, required: true },
    plataforma: { type: String, required: true }
});

module.exports = mongoose.model('Device', devicesSchema);
