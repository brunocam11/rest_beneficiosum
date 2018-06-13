var gcm = require('node-gcm');
 
// Preparan la conexión al FCM. Una única vez para múltiples mensajes.
var sender = new gcm.Sender('AAAACP4mC4w:APA91bEZ7QRNUQ6HUXVuHV1mWSDmkh5piGe1F27wKAoeuy3M4g-QrhPa9dpPIWJ-wvLo08Mxc_vjbTNI-YymSSEB13jAvUMcSbQQCzHSx7S_nIbad1Z4epoieo5ElY_S0QLoOSlX4WK_');
 
// Preparan el mensaje a enviar, usando como key del mensaje la palabra "message"
var message = new gcm.Message({
    data: { message: 'Hola este es mi mensaje' }
});
 
// Construyen un array de tokens. En su caso, los leerán desde la base de datos.
//Observar que puede ser uno solo.
var regTokens = ['dFMizwTzhMo:APA91bFL5GfdJnc92m3Z-mfsLN3Swe5spEXbwRKzWEKJ0MnlOOvXjHDE2YMR4Dg3nqvOLgh6z-wjL2X8GFNDF0Q7r8-RtW3zneY971a-HLifvikpmbvadfe0hajfx-wAKTN8tdhglvaC'];

// Envían el conjunto de mensajes.
sender.send(message, { registrationTokens: regTokens }, function (err, response) {
    if (err) console.error(err);
    else console.log(response);
});

/*
var admin = require("firebase-admin");

var serviceAccount = require("./beneficiosum-firebase-adminsdk-i8i1o-5593eb937f.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://beneficiosum.firebaseio.com"
});

var registrationToken = "c-RHhevqzGk:APA91bHCNdvnoAKY-UceA6_H-7RP33tO9gXuJVB4PUpI_Bstyi8JxAvcXgYXvEbk9HkdDoEt4NxpXu9GNYi9hDvIgLIyMidpJG8cuZN6-QXPThWuWny9gq5J-z3MrlKsbGlWUjkcpHig";

var payload = {
    data: {
        MyKey1: "Hello"
    }
};

var options = {
    priority: "high",
    timeToLive: 60 * 60 * 24
};

admin.messaging().sendToDevice(registrationToken,payload,options)
    .then(function(response) {
        console.log("Successfully sent message:", response);
    })
    .catch(function(error) {
        console.log("Error sending message: ",error);
    });
*/