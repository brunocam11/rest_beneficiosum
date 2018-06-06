var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
           user: 'gcolacibilsl@gmail.com',
           pass: 'hola'
       }
   });

const mailOptions = {
    from: 'gcolacibils@email.com', // sender address
    to: 'ascalabrini@correo.um.edu.uy', // list of receivers
    subject: 'Prueba', // Subject line
    html: '<p>Hola, esta es una prueba de envío de mail automático.</p>'// plain text body
  };