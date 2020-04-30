const express = require('express');
const router = express.Router();

const bodyController = require("../controller/bodyController");

router.get('/', bodyController.home);

router.get('/registro', bodyController.cadastro);
router.post('/registro', bodyController.store);


router.get('/carrinho', bodyController.carrinho);
router.get('/cliente', bodyController.validando, bodyController.cliente);
router.get('/ecomerce', bodyController.ecomerce);
router.get('/finalizar', bodyController.validando, bodyController.finalizar);
router.get('/infoProdutos', bodyController.infoProdutos);

router.get('/login', bodyController.login);
router.post('/login', bodyController.validatorLogin);


router.get('/mapa', bodyController.mapa);
router.get('/noticia', bodyController.noticia);
router.get('/paginaAdmin', bodyController.paginaAdmin);






module.exports = router;
