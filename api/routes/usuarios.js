const express = require('express');
const router = express.Router();
const UsuariosController = require('../controllers/usuarios');

router.post('/signup', UsuariosController.usuarios_singup);

router.post('/login', UsuariosController.usuarios_login);

router.delete('/:id', UsuariosController.usuarios_delete_usuario);

router.get('/', UsuariosController.usuarios_get_all);

router.post('/mail', UsuariosController.usuarios_enviar_mail);

router.post('/activar', UsuariosController.usuarios_activar);

module.exports = router;