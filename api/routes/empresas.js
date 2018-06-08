const express = require('express');
const router = express.Router();
const EmpresasController = require('../controllers/empresas');

router.get('/', EmpresasController.empresas_get_all);

router.post('/crear', EmpresasController.empresas_create);

router.get('/:id', EmpresasController.empresas_get_empresa);

router.patch('/:id', EmpresasController.empresas_update_empresa);

router.delete('/:id', EmpresasController.empresas_delete_empresa);

module.exports = router;