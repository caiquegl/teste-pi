const express = require('express');
const router = express.Router();
const multer = require("multer");
const path = require("path");



const bodyController = require("../controller/bodyController");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join("public", "foto"));
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + file.originalname);
    },
  });

const upload = multer({ storage: storage });


router.get('/', bodyController.home);

router.get('/registro', bodyController.cadastro);
router.post('/registro', bodyController.store);


router.get('/carrinho', bodyController.carrinho);
router.get('/cliente', bodyController.validando, bodyController.cliente);
router.get('/ecomerce', bodyController.ecomerce);
router.get('/finalizar', bodyController.validando, bodyController.finalizar);
router.get('/infoProdutos/:id', bodyController.infoProdutos);


router.get('/login', bodyController.login);
router.post('/login', bodyController.validatorLogin);


router.get('/mapa', bodyController.mapa);
router.get('/noticia', bodyController.noticia);

router.get('/paginaAdmin', bodyController.validando, bodyController.paginaAdmin);
router.post('/paginaAdmin', upload.any() ,bodyController.storeProduto);







module.exports = router;
