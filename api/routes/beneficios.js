const express = require('express');
const router = express.Router();
const multer = require('multer');
const checkAuth = require('../middleware/check-auth');
const BeneficiosController = require('../controllers/beneficios')

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './fotos');
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  }
});

const fileFilter = (req, res, cb) => {
  // solo aceptar imagenes
  if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
    cb(null, true);
  } else {
    cb(null, false);
  }
}

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 2
  },
  fileFilter: fileFilter
});

router.get('/', BeneficiosController.beneficios_get_all );

router.post('/crear', upload.single('foto'), BeneficiosController.beneficios_create);

router.get('/:id', BeneficiosController.beneficios_get_beneficio);

router.patch('/:id', BeneficiosController.beneficios_update_beneficio);

router.delete('/:id', BeneficiosController.beneficios_delete_beneficio);

module.exports = router;