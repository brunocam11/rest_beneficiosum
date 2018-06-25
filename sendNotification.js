var gcm = require('node-gcm');
const express = require('express');
const router = express.Router();
const DevicesController = require('./api/controllers/devices');
const Device = require('./api/models/device');
var servidor = '192.168.1.50';

 
// Preparan la conexión al FCM. Una única vez para múltiples mensajes.
var sender = new gcm.Sender('AAAACP4mC4w:APA91bEZ7QRNUQ6HUXVuHV1mWSDmkh5piGe1F27wKAoeuy3M4g-QrhPa9dpPIWJ-wvLo08Mxc_vjbTNI-YymSSEB13jAvUMcSbQQCzHSx7S_nIbad1Z4epoieo5ElY_S0QLoOSlX4WK_');
 
// Preparan el mensaje a enviar, usando como key del mensaje la palabra "message"

 
// Construyen un array de tokens. En su caso, los leerán desde la base de datos.
//Observar que puede ser uno solo.
var regTokens = ['dFMizwTzhMo:APA91bFL5GfdJnc92m3Z-mfsLN3Swe5spEXbwRKzWEKJ0MnlOOvXjHDE2YMR4Dg3nqvOLgh6z-wjL2X8GFNDF0Q7r8-RtW3zneY971a-HLifvikpmbvadfe0hajfx-wAKTN8tdhglvaC', 'c-RHhevqzGk:APA91bHCNdvnoAKY-UceA6_H-7RP33tO9gXuJVB4PUpI_Bstyi8JxAvcXgYXvEbk9HkdDoEt4NxpXu9GNYi9hDvIgLIyMidpJG8cuZN6-QXPThWuWny9gq5J-z3MrlKsbGlWUjkcpHig'];



// Envían el conjunto de mensajes.
function enviarMensaje(mensaje){

    var tokens = [];
    Device.find().select('-__v').exec().then((doc) => {
        //console.log(doc);
        if (doc) {
            console.log('doc: '+doc);
            for (let i=0;i<doc.length;i++) {
                tokens.push(doc[i].token);    //Obviamente dependerá del nombre del campo que usaron.
            }
        } else {

        }
        var message = new gcm.Message({
            data: { message: mensaje }
        });
        //var regTokens = ['dFMizwTzhMo:APA91bFL5GfdJnc92m3Z-mfsLN3Swe5spEXbwRKzWEKJ0MnlOOvXjHDE2YMR4Dg3nqvOLgh6z-wjL2X8GFNDF0Q7r8-RtW3zneY971a-HLifvikpmbvadfe0hajfx-wAKTN8tdhglvaC', 'c-RHhevqzGk:APA91bHCNdvnoAKY-UceA6_H-7RP33tO9gXuJVB4PUpI_Bstyi8JxAvcXgYXvEbk9HkdDoEt4NxpXu9GNYi9hDvIgLIyMidpJG8cuZN6-QXPThWuWny9gq5J-z3MrlKsbGlWUjkcpHig'];

        sender.send(message, { registrationTokens: tokens }, function (err, response) {
            if (err) console.error(err);
            else console.log(response);
        });
    }).catch((err) => {
        console.log(err);
    });

}

module.exports = {enviarMensaje};