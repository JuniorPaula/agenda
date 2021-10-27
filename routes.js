/** 1 trazer o express */
const express = require('express');

/** 2- Faser o express usar o router */
const route = express.Router();

/** Importando o HomeControllers */
const HomeController = require('./src/controllers/HomeController');

/** Importando contatoController */
const ContatoController = require('./src/controllers/ContatoController');


/** Rota da pagina inicial vinda do HomeControlers */
route.get('/', HomeController.paginaInicial);
route.post('/', HomeController.trataPost);

/** Rota da pagina de contato vinda da ContatoController */
route.get('/contato', ContatoController.paginaInicial);


/** exportando o route */
module.exports = route;