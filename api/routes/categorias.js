const express = require('express');
const router = express.Router();
const CategoriasController = require('../controllers/categorias');

router.get('/', CategoriasController.categorias_get_all);

router.post('/crear', CategoriasController.categorias_create);

router.get('/:id', CategoriasController.categorias_get_categoria);

router.patch('/:id', CategoriasController.categorias_update_categoria);

router.delete('/:id', CategoriasController.categorias_delete_categoria);

module.exports = router;