const http = require('http');
const app = require('./app');

const port = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(port, '192.168.1.50');

/* lo del mail
var api_key = 'key-c2756a1f00f4f70f394bdf10a529c2f7';
var domain = 'sandboxfce0a2c4b1e64be8933ad6af7183624c.mailgun.org';
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
var numeroVerificacion = Math.floor((Math.random() * 100000) + 1)

var data = {
    from: 'postmaster@sandboxfce0a2c4b1e64be8933ad6af7183624c.mailgun.org',
    to: 'gcola@correo.um.edu.uy',
    subject: 'Confirmación de cuenta de BeneficiosUM',
    html: '<p style="color:blue;">Hola,</p>'+
    '<p>¡Gracias por registrarte a BeneficiosUM!</p>'+
    '<p>Ahora estarás al tanto de todas los beneficios que tenés por estudiar en la UM.</p>'+
    '<p>Tu número de verificación es: '+numeroVerificacion+'</p>'
};

mailgun.messages().send(data, function (error, body) {
    console.log(body);
});
*/
